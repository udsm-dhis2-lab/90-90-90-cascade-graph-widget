import { Analytics } from '../models/analytics.model';
import { ChartConfiguration } from '../models/chart-configuration.model';
import { Extension } from '../models/extension.model';
import * as _ from 'lodash';

export function drawChart(
    analytics: Analytics,
    configuration: ChartConfiguration,
    extension: Extension
) {
    return {
        chart: getChartAttributeOptions(configuration),
        title: getChartTitleObject(configuration),
        subtitle: getChartSubtitleObject(configuration, analytics),
        credits: getChartCreditsOptions(),
        colors: getChartColors(),
        plotOptions: getPlotOptions(configuration),
        tooltip: getTooltipOptions(configuration),
        exporting: getChartExportingOptions(),
    };
}

function getLegendOptions(chartConfiguration: any) {
    return {
        align: chartConfiguration.legendAlign,
        reversed: chartConfiguration.reverseLegend,
        layout:
            chartConfiguration.legendAlign === 'right' ||
                chartConfiguration.legendAlign === 'left'
                ? 'vertical'
                : 'horizontal',
        y:
            chartConfiguration.legendAlign === 'top'
                ? 0
                : chartConfiguration.legendAlign === 'bottom'
                    ? 25
                    : 0,
    };
}


function getChartAttributeOptions(chartConfiguration: any) {
    const chartOptions: any = {
        renderTo: chartConfiguration.renderId,
        zoomType: 'xy',
        type: getAllowedChartType(chartConfiguration.type),
    };

    /**
     * Extend Options depending on chart type
     */
    if (chartConfiguration.type === 'pie') {
        chartOptions.plotBackgroundColor = null;
        chartOptions.plotBorderWidth = null;
        chartOptions.plotShadow = false;
    } else if (chartConfiguration.type === 'radar') {
        chartOptions.polar = true;
    } else if (chartConfiguration.type === 'special') {
        chartOptions.type = 'line';
    }

    return chartOptions;
}

function getChartTitleObject(chartConfiguration: any): any {
    if (chartConfiguration.hideTitle) {
        return null;
    }
    return {
        text: chartConfiguration.title,
        align: 'center',
        style: {
            fontWeight: '500',
            fontSize: '16px',
        },
    };
}

function getChartSubtitleObject(
    chartConfiguration: any,
    analyticsObject: any
): any {
    if (chartConfiguration.hideSubtitle) {
        return null;
    }
    return {
        text: _.map(chartConfiguration.zAxisType, (zAxis: string) =>
            _.map(
                analyticsObject && analyticsObject.metaData
                    ? analyticsObject.metaData[zAxis] || []
                    : [],
                (itemId: string) =>
                    analyticsObject &&
                        analyticsObject.metaData &&
                        analyticsObject.metaData.names
                        ? analyticsObject.metaData.names[itemId] || []
                        : []
            ).join(', ')
        ).join(' - '),
        align: 'center',
        style: {
            fontWeight: '500',
            fontSize: '12px',
        },
    };
}

function getChartCreditsOptions(): any {
    return {
        enabled: false,
    };
}

function getChartColors(): any[] {
    return [
        '#A9BE3B',
        '#558CC0',
        '#D34957',
        '#FF9F3A',
        '#968F8F',
        '#B7409F',
        '#FFDA64',
        '#4FBDAE',
        '#B78040',
        '#676767',
        '#6A33CF',
        '#4A7833',
        '#434348',
        '#7CB5EC',
        '#F7A35C',
        '#F15C80',
    ];
}

function getPlotOptions(chartConfiguration: any) {
    const plotOptionChartType = getAllowedChartType(chartConfiguration.type);

    const plotOptions = {};
    if (plotOptionChartType) {
        switch (plotOptionChartType) {
            case 'solidgauge':
                plotOptions[plotOptionChartType] = {
                    dataLabels: {
                        y: 5,
                        borderWidth: 0,
                        useHTML: true,
                    },
                };
                break;
            case 'gauge':
                plotOptions[plotOptionChartType] = {
                    dataLabels: {
                        y: 5,
                        borderWidth: 0,
                        useHTML: true,
                    },
                };
                break;
            case 'pie':
                plotOptions[plotOptionChartType] = {
                    borderWidth: 0,
                    allowPointSelect: true,
                    cursor: 'pointer',
                    showInLegend: !chartConfiguration.hideLegend,
                };
                break;
            default:
                plotOptions[
                    plotOptionChartType !== '' ? plotOptionChartType : 'series'
                ] = {
                        showInLegend: !chartConfiguration.hideLegend,
                        colorByPoint: false,
                    };

                /**
                 * Set attributes for stacked charts
                 */
                if (
                    chartConfiguration.type === 'stacked_column' ||
                    chartConfiguration.type === 'stacked_bar' ||
                    chartConfiguration.type === 'area'
                ) {
                    plotOptions[
                        plotOptionChartType
                    ].stacking = chartConfiguration.percentStackedValues
                            ? 'percent'
                            : 'normal';
                }

                if (chartConfiguration.type === 'dotted') {
                    plotOptions['line'] = {
                        lineWidth: 0,
                        states: {
                            hover: {
                                enabled: false,
                            },
                        },
                    };
                }

                break;
        }
    }
    return plotOptions;
}

function getTooltipOptions(chartConfiguration: any) {
    const tooltipChartType = getAllowedChartType(chartConfiguration.type);
    let tooltipObject: any = {};

    if (tooltipChartType) {
        switch (tooltipChartType) {
            case 'solidgauge':
                tooltipObject = {
                    enabled: false,
                };
                break;
            case 'pie':
                tooltipObject = {
                    pointFormat:
                        '{series.name}<br/> <b>{point.y}</b> ( {point.percentage:.1f} % )',
                };
                break;
            default:
                switch (chartConfiguration.type) {
                    case 'stacked_column':
                        tooltipObject = {
                            headerFormat: '<b>{point.x}</b><br/>',
                            pointFormat:
                                '{series.name}: {point.y}<br/>Total: {point.stackTotal}',
                        };
                        break;
                    default:
                        tooltipObject = {
                            enabled: true,
                        };
                        break;
                }
                break;
        }
    }
    return tooltipObject;
}


function getChartExportingOptions(): any {
    return {
        buttons: {
            contextButton: {
                enabled: false,
            },
        },
    };
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
