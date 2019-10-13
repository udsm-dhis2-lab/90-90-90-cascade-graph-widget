import { ChartConfiguration } from '../models/chart-configuration.model';
import * as _ from 'lodash';

export function extendOtherChartOptions(
    initialChartObject: any,
    analyticsObject: any,
    chartConfiguration: any
): any {
    const yAxisSeriesItems: any[] = getAxisItems(
        analyticsObject,
        chartConfiguration.yAxisType
    );

    /**
     * Sort the corresponding series
     */
    const sortedSeries = getSortableSeries(
        getChartSeries(
            analyticsObject,
            getAxisItemsNew(analyticsObject, chartConfiguration.xAxisType, true),
            yAxisSeriesItems,
            chartConfiguration
        ),
        chartConfiguration.cumulativeValues ? -1 : chartConfiguration.sortOrder
    );

    /**
     * Update series with axis options
     */
    const seriesWithAxisOptions = updateSeriesWithAxisOptions(
        sortedSeries,
        chartConfiguration.multiAxisTypes,
        chartConfiguration.touched
    );

    /**
     * Update colors by considering if series has data
     */
    const newColors: any[] = _.filter(
        _.map(seriesWithAxisOptions, seriesObject =>
            seriesObject.data[0] ? seriesObject.data[0].color : undefined
        ),
        color => color
    );

    return {
        ...initialChartObject,
        yAxis: getYAxisOptions(chartConfiguration),
        xAxis: getXAxisOptions(
            getRefinedXAxisCategories(seriesWithAxisOptions),
            chartConfiguration.type
        ),
        colors: newColors.length > 0 ? newColors : initialChartObject.colors,
        series: seriesWithAxisOptions,
    };
}

function getAxisItems(
    analyticsObject: any,
    axisType: string,
    isCategory: boolean = false
) {
    let items: any[] = [];
    const metadataNames = analyticsObject.metaData.names;
    const itemKeys = analyticsObject.metaData[axisType];

    if (itemKeys) {
        items = _.map(itemKeys, itemKey => {
            return {
                id: itemKey,
                name: metadataNames[itemKey],
            };
        });
    }

    return items;
}


function getAxisItemsNew(
    analyticsObject: any,
    axisTypeArray: any[],
    isCategory: boolean = false
) {
    let items: any[] = [];
    const metadataNames = analyticsObject.metaData.names;
    axisTypeArray.forEach((axisType, axisIndex) => {
        const itemKeys = analyticsObject.metaData[axisType];
        if (itemKeys) {
            if (axisIndex > 0) {
                const availableItems = _.assign([], items);
                items = [];
                itemKeys.forEach(itemKey => {
                    availableItems.forEach(item => {
                        items.push({
                            id: item.id + '_' + itemKey,
                            name: item.name + '_' + metadataNames[itemKey].trim(),
                        });
                    });
                });
            } else {
                items = _.map(itemKeys, itemKey => {
                    return {
                        id: itemKey,
                        name: metadataNames[itemKey].trim(),
                    };
                });
            }
        }
    });

    return items;
}

function getChartSeries(
    analyticsObject: any,
    xAxisItems: any[],
    yAxisItems: any[],
    chartConfiguration: any
) {
    const series = yAxisItems.map((yAxisItem, yAxisIndex) => {
        return {
            name: yAxisItem.name,
            id: yAxisItem.id,
            index: yAxisIndex,
            turboThreshold: 0,
            pointPlacement: chartConfiguration.type === 'radar' ? 'on' : undefined,
            data: getSeriesData(
                analyticsObject,
                chartConfiguration,
                yAxisItem.id,
                xAxisItems
            ),
            type: getAllowedChartType(chartConfiguration.type),
        };
    });

    return series;
}

function getSeriesData(
    analyticsObject: any,
    chartConfiguration: any,
    yAxisItemId: string,
    xAxisItems: any[]
) {
    const data: any[] = [];
    /**
     * Get index to locate data for y axis
     */
    const yAxisItemIndex = _.findIndex(
        analyticsObject.headers,
        _.find(analyticsObject.headers, ['name', chartConfiguration.yAxisType])
    );

    /**
     * Get index for value attribute to get the data
     */
    const dataIndex = _.findIndex(
        analyticsObject.headers,
        _.find(analyticsObject.headers, ['name', 'value'])
    );

    /**
     * Get index to locate data for x axis
     */
    const xAxisItemIndex = _.map(
        chartConfiguration.xAxisType,
        (xAxisType: any) => {
            return _.findIndex(
                analyticsObject.headers,
                _.find(analyticsObject.headers, ['name', xAxisType])
            );
        }
    ).join('_');

    if (xAxisItems) {
        xAxisItems.forEach(xAxisItem => {
            /**
             * Get the required data depending on xAxis and yAxis
             */
            const seriesValue = getSeriesValue(
                analyticsObject.rows,
                yAxisItemIndex,
                yAxisItemId,
                xAxisItemIndex,
                xAxisItem.id,
                dataIndex
            );

            data.push({
                id: xAxisItem.id,
                name: xAxisItem.name,
                dataLabels: getDataLabelsOptions(chartConfiguration),
                y: seriesValue,
            });
        });
    }

    return data;
}

function getDataLabelsOptions(chartConfiguration: any) {
    let dataLabels = null;

    switch (chartConfiguration.type) {
        case 'pie':
            dataLabels = {
                enabled: chartConfiguration.showData,
                format:
                    '{point.name}<br/> <b>{point.y}</b> ( {point.percentage:.1f} % )',
            };
            break;
        default:
            dataLabels = {
                enabled: chartConfiguration.showData,
            };
            break;
    }

    return dataLabels;
}

function getSeriesValue(
    analyticsRows,
    yAxisItemIndex,
    yAxisItemId,
    xAxisItemIndex,
    xAxisItemId,
    dataIndex
) {
    let finalValue = 0;
    const seriesValues = _.map(analyticsRows, row => {
        let seriesValue = 0;
        let xAxisRowId = '';
        _.forEach(xAxisItemIndex.split('_'), (axisIndex: any) => {
            xAxisRowId += xAxisRowId !== '' ? '_' : '';
            xAxisRowId += row[axisIndex];
        });

        if (row[yAxisItemIndex] === yAxisItemId && xAxisRowId === xAxisItemId) {
            const value = parseFloat(row[dataIndex]);
            if (isNaN(value)) {
                return row[dataIndex];
            }
            seriesValue += value;
        }
        return seriesValue;
    }).filter(value => value !== 0);

    if (seriesValues) {
        // Check if series values have non numeric content
        if (_.some(seriesValues, seriesValue => isNaN(seriesValue))) {
            return '';
        }
        // TODO find best way to identify ratios
        const isRatio = _.some(
            seriesValues,
            seriesValue => seriesValue.toString().split('.')[1]
        );

        const valueSum =
            seriesValues.length > 0
                ? seriesValues.reduce((sum, count) => sum + count)
                : 0;

        if (isRatio) {
            finalValue = parseFloat((valueSum / seriesValues.length).toFixed(2));
        } else {
            finalValue = valueSum;
        }
    }

    return finalValue !== 0 ? finalValue : null;
}


function getSortableSeries(series, sortOrder) {
    let newSeries = [...series];
    let seriesCategories = [];

    /**
     * Combine all available series for sorting
     */
    const combinedSeriesData = [
        ...getCombinedSeriesData(_.map(series, seriesObject => seriesObject.data)),
    ];

    if (sortOrder === 1) {
        seriesCategories = _.map(
            _.reverse(_.sortBy(combinedSeriesData, ['y'])),
            seriesData => seriesData.id
        );
        newSeries = _.map(newSeries, seriesObject => {
            const newSeriesObject: any = { ...seriesObject };

            if (seriesCategories.length > 0) {
                newSeriesObject.data = [
                    ..._.map(seriesCategories, seriesCategory =>
                        _.find(seriesObject.data, ['id', seriesCategory])
                    ),
                ];
            }

            return newSeriesObject;
        });
    } else if (sortOrder === -1) {
        seriesCategories = _.map(
            _.sortBy(combinedSeriesData, ['y']),
            seriesData => seriesData.id
        );
        newSeries = _.map(series, seriesObject => {
            const newSeriesObject: any = { ...seriesObject };

            if (seriesCategories.length > 0) {
                newSeriesObject.data = [
                    ..._.map(seriesCategories, seriesCategory =>
                        _.find(seriesObject.data, ['id', seriesCategory])
                    ),
                ];
            }
            return newSeriesObject;
        });
    }
    return newSeries;
}

function getCombinedSeriesData(seriesData: any) {
    let combinedSeriesData = [];
    seriesData.forEach(seriesDataArray => {
        seriesDataArray.forEach(seriesDataObject => {
            const availableSeriesData = _.find(combinedSeriesData, [
                'id',
                seriesDataObject.id,
            ]);
            if (!availableSeriesData) {
                combinedSeriesData = [...combinedSeriesData, seriesDataObject];
            } else {
                const seriesDataIndex = _.findIndex(
                    combinedSeriesData,
                    availableSeriesData
                );
                const newSeriesObject = { ...seriesDataObject };
                newSeriesObject.y += availableSeriesData.y;
                combinedSeriesData = [
                    ...combinedSeriesData.slice(0, seriesDataIndex),
                    newSeriesObject,
                    ...combinedSeriesData.slice(seriesDataIndex + 1),
                ];
            }
        });
    });

    return combinedSeriesData;
}

function getYAxisOptions(chartConfiguration: any) {
    const yAxes: any[] = chartConfiguration.axes;
    let newYAxes: any[] = [];

    if (yAxes.length === 0) {
        newYAxes = _.assign(
            [],
            [
                {
                    min: chartConfiguration.rangeAxisMinValue,
                    max: chartConfiguration.rangeAxisMaxValue,
                    title: {
                        text: '',
                        style: {
                            color: '#000000',
                            fontWeight: 'normal',
                            fontSize: '14px',
                        },
                    },
                },
            ]
        );
    } else {
        newYAxes = _.map(yAxes, (yAxis: any, yAxisIndex: any) => {
            return {
                min: chartConfiguration.rangeAxisMinValue,
                max: chartConfiguration.rangeAxisMaxValue,
                title: {
                    text: yAxis.name,
                    style: { color: '#000000', fontWeight: 'normal', fontSize: '14px' },
                },
                opposite: yAxis.orientation === 'left' ? false : true,
            };
        });
    }

    return _.map(newYAxes, (yAxis: any) => {
        /**
         * Get more options depending on chart type
         */
        switch (chartConfiguration.type) {
            case 'radar':
                yAxis['gridLineInterpolation'] = 'polygon';
                yAxis['lineWidth'] = 0;
                break;
            case 'solidgauge':
                yAxis['lineWidth'] = 0;
                yAxis['labels'] = {
                    y: 16,
                };
                yAxis['max'] = 100;
                break;
            case 'stacked_column':
                yAxis['stackLabels'] = {
                    enabled: false,
                    style: {
                        fontWeight: 'bold',
                    },
                };
                break;
            default:
                yAxis['labels'] = {
                    style: { color: '#000000', fontWeight: 'normal', fontSize: '14px' },
                };
                yAxis['plotLines'] = [
                    {
                        color: '#000000',
                        dashStyle: 'Solid',
                        value: chartConfiguration.targetLineValue,
                        width: 2,
                        zIndex: 1000,
                        label: {
                            text: chartConfiguration.targetLineLabel,
                        },
                    },
                    {
                        color: '#000000',
                        dashStyle: 'Solid',
                        value: chartConfiguration.baseLineValue,
                        zIndex: 1000,
                        width: 2,
                        label: {
                            text: chartConfiguration.baseLineLabel,
                        },
                    },
                ];
                break;
        }
        return yAxis;
    });
}

function getXAxisOptions(
    xAxisCategories: any[],
    chartConfiguration: ChartConfiguration
) {
    let xAxisOptions = {};

    switch (chartConfiguration.type) {
        case 'radar':
            xAxisOptions = _.assign(
                {},
                {
                    categories: xAxisCategories,
                    tickmarkPlacement: 'on',
                    lineWidth: 0,
                }
            );
            break;
        default:
            xAxisOptions = _.assign(
                {},
                {
                    categories: xAxisCategories,
                    labels: {
                        rotation:
                            xAxisCategories.length <= 5
                                ? 0
                                : xAxisCategories.length >= 10
                                    ? -45
                                    : -45,
                        style: {
                            color: '#000000',
                            fontWeight: 'normal',
                            fontSize: '12px',
                            textOverflow: 'none',
                        },
                    },
                }
            );
            break;
    }

    return xAxisOptions;
}

function getRefinedXAxisCategories(series: any[]) {
    let newCategories: any[] = [];
    if (series) {
        const seriesDataObjects = _.map(
            series,
            (seriesObject: any) => seriesObject.data
        );

        if (seriesDataObjects) {
            const seriesCategoryNamesArray = _.map(seriesDataObjects, seriesData => {
                return _.map(seriesData, data => {
                    // const nameArray = data.name.split('_');
                    const nameArray = [data.name];
                    const newCategoryArray = [];
                    if (nameArray) {
                        const reversedNameArray = _.reverse(nameArray);
                        _.times(nameArray.length, (num: number) => {
                            if (num === 0) {
                                newCategoryArray.push({ name: reversedNameArray[num] });
                            } else {
                                const parentCategory: any = _.find(newCategoryArray, [
                                    'name',
                                    reversedNameArray[num - 1],
                                ]);

                                if (parentCategory) {
                                    const parentCategoryIndex = _.findIndex(
                                        newCategoryArray,
                                        parentCategory
                                    );
                                    let newChildrenCategories: any[] = parentCategory.categories
                                        ? parentCategory.categories
                                        : [];
                                    newChildrenCategories = _.concat(
                                        newChildrenCategories,
                                        reversedNameArray[num]
                                    );
                                    parentCategory.categories = _.assign(
                                        [],
                                        newChildrenCategories
                                    );

                                    newCategoryArray[parentCategoryIndex] = parentCategory;
                                }
                            }
                        });
                    }
                    return newCategoryArray[0];
                });
            });

            if (seriesCategoryNamesArray) {
                const groupedCategoryNames = _.groupBy(
                    seriesCategoryNamesArray[0],
                    'name'
                );
                const categoryNameGroupKeys = _.map(
                    seriesCategoryNamesArray[0],
                    category => category.name
                );
                const sanitizedCategoryNames: any[] = [];
                _.forEach(categoryNameGroupKeys, (key: any) => {
                    const categories = _.filter(
                        _.map(groupedCategoryNames[key], (categoryObject: any) => {
                            return categoryObject.categories
                                ? categoryObject.categories[0]
                                : null;
                        }),
                        (category: any) => category !== null
                    );
                    if (categories.length === 0) {
                        sanitizedCategoryNames.push({ name: key });
                    } else {
                        sanitizedCategoryNames.push({
                            name: key,
                            categories: categories,
                        });
                    }
                });

                newCategories = _.assign([], sanitizedCategoryNames);
            }
        }
    }

    return _.uniqBy(newCategories, 'name');
}

function updateSeriesWithAxisOptions(
    series: any[],
    multiAxisOptions: any[],
    touched: boolean = false
) {
    return _.map(series, (seriesObject: any) => {
        const newSeriesObject = _.clone(seriesObject);
        const availableAxisOption: any = _.find(multiAxisOptions, [
            'id',
            newSeriesObject.id,
        ]);
        if (availableAxisOption) {
            newSeriesObject.yAxis = availableAxisOption.axis
                ? availableAxisOption.axis === 'left'
                    ? 0
                    : 1
                : 0;

            newSeriesObject.type =
                availableAxisOption.type !== '' && !touched
                    ? getAllowedChartType(availableAxisOption.type)
                    : seriesObject.type;

            if (availableAxisOption.type === 'dotted') {
                newSeriesObject.lineWidth = 0;
                newSeriesObject.states = {
                    hover: {
                        enabled: false,
                    },
                };
            }

            /**
             *Also apply colors on chart
             */
            newSeriesObject.data = _.map(newSeriesObject.data, dataObject => {
                const newDataObject = _.clone(dataObject);
                if (availableAxisOption.color !== '') {
                    newDataObject.color = availableAxisOption.color;
                }
                return newDataObject;
            });
        }
        return newSeriesObject;
    });
}

function getAllowedChartType(chartType: string): string {
    let newChartType = '';
    switch (chartType) {
        case 'radar':
            newChartType = 'line';
            break;
        case 'dotted':
            newChartType = 'line';
            break;
        default:
            const splitedChartType: any[] = chartType.split('_');
            newChartType =
                splitedChartType.length > 1 ? splitedChartType[1] : splitedChartType[0];
            break;
    }
    return newChartType;
}
