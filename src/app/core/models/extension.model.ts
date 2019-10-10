export interface Extension {
    name: string;
    id: string;
    useCustomCategories: boolean;
    useMultiAxis: boolean;
    specialChartType: SpecialChartType;
    multiAxisLabels: MultiAxisLabel[];
    chartTypes: ChartType[];
    categories: Category[];
    extensions: Extension[];
}

export interface SpecialChartType {
    isSpecial: boolean;
    isGeneric: boolean;
    type: string;
}

export interface YAxis {
    max?: any;
    min?: any;
}

export interface MultiAxisLabel {
    label: string;
    axisDataFormat: string;
    opposite: boolean;
    yAxis: YAxis;
}

export interface ChartType {
    name: string;
}

export interface Category {
    id: string;
    name: string;
}

export interface Extension {
    id: string;
    type: string;
    name: string;
}
