export interface ChartFavorite {
    lastUpdated: Date;
    id: string;
    href: string;
    created: Date;
    name: string;
    showData: boolean;
    publicAccess: string;
    userOrganisationUnitChildren: boolean;
    type: string;
    subscribed: boolean;
    parentGraphMap: ParentGraphMap;
    userOrganisationUnit: boolean;
    displayDescription: string;
    regressionType: string;
    completedOnly: boolean;
    cumulativeValues: boolean;
    sortOrder: number;
    favorite: boolean;
    topLimit: number;
    hideEmptyRowItems: string;
    aggregationType: string;
    userOrganisationUnitGrandChildren: boolean;
    displayName: string;
    hideSubtitle: boolean;
    description: string;
    hideLegend: boolean;
    externalAccess: boolean;
    percentStackedValues: boolean;
    noSpaceBetweenColumns: boolean;
    hideTitle: boolean;
    series: string;
    category: string;
    lastUpdatedBy: LastUpdatedBy;
    access: Access;
    relativePeriods: RelativePeriods;
    user: User;
    dataElementGroupSetDimensions: any[];
    attributeDimensions: any[];
    translations: any[];
    filterDimensions: string[];
    interpretations: any[];
    itemOrganisationUnitGroups: any[];
    userGroupAccesses: any[];
    programIndicatorDimensions: any[];
    subscribers: any[];
    attributeValues: any[];
    userAccesses: any[];
    favorites: any[];
    dataDimensionItems: DataDimensionItem[];
    categoryOptionGroupSetDimensions: any[];
    columns: Column[];
    organisationUnitGroupSetDimensions: any[];
    organisationUnitLevels: any[];
    dataElementDimensions: any[];
    periods: any[];
    organisationUnits: OrganisationUnit[];
    categoryDimensions: any[];
    filters: Filter[];
    rows: Row[];
}

export interface ParentGraphMap {
    m0frOspS7JY: string;
}

export interface LastUpdatedBy {
    id: string;
}

export interface Access {
    read: boolean;
    update: boolean;
    externalize: boolean;
    delete: boolean;
    write: boolean;
    manage: boolean;
}

export interface RelativePeriods {
    thisYear: boolean;
    quartersLastYear: boolean;
    last52Weeks: boolean;
    thisWeek: boolean;
    lastMonth: boolean;
    last14Days: boolean;
    biMonthsThisYear: boolean;
    monthsThisYear: boolean;
    last2SixMonths: boolean;
    yesterday: boolean;
    thisQuarter: boolean;
    last12Months: boolean;
    last5FinancialYears: boolean;
    thisSixMonth: boolean;
    lastQuarter: boolean;
    thisFinancialYear: boolean;
    last4Weeks: boolean;
    last3Months: boolean;
    thisDay: boolean;
    thisMonth: boolean;
    last5Years: boolean;
    last6BiMonths: boolean;
    last4BiWeeks: boolean;
    lastFinancialYear: boolean;
    lastBiWeek: boolean;
    weeksThisYear: boolean;
    last6Months: boolean;
    last3Days: boolean;
    quartersThisYear: boolean;
    monthsLastYear: boolean;
    lastWeek: boolean;
    last7Days: boolean;
    thisBimonth: boolean;
    lastBimonth: boolean;
    lastSixMonth: boolean;
    thisBiWeek: boolean;
    lastYear: boolean;
    last12Weeks: boolean;
    last4Quarters: boolean;
}

export interface User {
    id: string;
}

export interface Indicator {
    id: string;
}

export interface DataDimensionItem {
    dataDimensionItemType: string;
    indicator: Indicator;
}

export interface Column {
    id: string;
}

export interface OrganisationUnit {
    id: string;
}

export interface Filter {
    id: string;
}

export interface Row {
    id: string;
}
