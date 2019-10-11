import { ChartConfiguration } from '../models/chart-configuration.model';

export function getChartConfiguration(
    favoriteSettings: any,
    renderId: string,
    visualizationLayout: any,
    customChartType: string = ''
): ChartConfiguration {
    const chartType =
        customChartType !== ''
            ? customChartType.toLowerCase()
            : favoriteSettings.type
                ? favoriteSettings.type.toLowerCase()
                : 'column';
    return {
        renderId: renderId,
        type: chartType,
        title: favoriteSettings.hasOwnProperty('displayName')
            ? favoriteSettings.displayName
            : '',
        subtitle: favoriteSettings.hasOwnProperty('subtitle')
            ? favoriteSettings.subtitle
            : '',
        hideTitle: favoriteSettings.hasOwnProperty('hideTitle')
            ? favoriteSettings.hideTitle
            : true,
        hideSubtitle: favoriteSettings.hasOwnProperty('hideSubtitle')
            ? favoriteSettings.hideSubtitle
            : true,
        showData: favoriteSettings.hasOwnProperty('showData')
            ? favoriteSettings.showData
            : true,
        hideEmptyRows: favoriteSettings.hasOwnProperty('hideEmptyRows')
            ? favoriteSettings.hideEmptyRows
            : true,
        hideLegend: favoriteSettings.hasOwnProperty('hideLegend')
            ? favoriteSettings.hideLegend
            : true,
        cumulativeValues: favoriteSettings.hasOwnProperty('cumulativeValues')
            ? favoriteSettings.cumulativeValues
            : false,
        targetLineValue: favoriteSettings.targetLineValue
            ? favoriteSettings.targetLineValue
            : undefined,
        targetLineLabel: favoriteSettings.targetLineLabel
            ? favoriteSettings.targetLineLabel
            : '',
        baseLineValue: favoriteSettings.baseLineValue
            ? favoriteSettings.baseLineValue
            : undefined,
        baseLineLabel: favoriteSettings.baseLineLabel
            ? favoriteSettings.baseLineLabel
            : '',
        legendAlign: 'bottom',
        reverseLegend: false,
        showLabels: true,
        axes: favoriteSettings.axes ? favoriteSettings.axes : [],
        rangeAxisMaxValue: favoriteSettings.rangeAxisMaxValue
            ? favoriteSettings.rangeAxisMaxValue
            : undefined,
        rangeAxisMinValue: favoriteSettings.rangeAxisMinValue
            ? favoriteSettings.rangeAxisMinValue
            : undefined,
        sortOrder: favoriteSettings.hasOwnProperty('sortOrder')
            ? favoriteSettings.sortOrder
            : 0,
        percentStackedValues: favoriteSettings.hasOwnProperty(
            'percentStackedValues'
        )
            ? favoriteSettings.percentStackedValues
            : false,
        multiAxisTypes: favoriteSettings.hasOwnProperty('selectedChartTypes')
            ? favoriteSettings.selectedChartTypes
            : [],
        xAxisType: visualizationLayout.rows ? visualizationLayout.rows : ['dx'],
        yAxisType: visualizationLayout.columns
            ? visualizationLayout.columns[0]
            : 'ou',
        zAxisType: visualizationLayout.filters
            ? visualizationLayout.filters
            : ['pe'],
    };
}
