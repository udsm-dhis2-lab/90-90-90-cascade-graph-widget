import { Favorite, DataDimensionItem } from '../models/favorite.model';
import { Analytics } from '../models/analytics.model';
import * as _ from 'lodash';

export function getSanitizedAnalytics(
    favorite: Favorite,
    analytics: Analytics
) {
    if (favorite && analytics) {
        const names = getMetadataNames(analytics);
        const metaData = {
            ...analytics.metaData,
            names,
            ...analytics.metaData.dimensions,
        };
        const sanitizedAnalytics = removeFromAnalytics({ ...analytics, metaData });
        const analyticsItems = getAnalyticsItems(favorite, sanitizedAnalytics);
        const analyticsMetadata = {
            ...sanitizedAnalytics.metaData,
            analyticsItems,
        };
        return { ...sanitizedAnalytics, metaData: analyticsMetadata };
    }
}

function getMetadataNames(analytics: Analytics) {
    return analytics
        ? getItemListIdAndName(analytics.metaData.items)
            ? sanitizedItemNames(getItemListIdAndName(analytics.metaData.items))
            : {}
        : {};
}

function getItemListIdAndName(items: {}) {
    return items
        ? Object.keys(items).map(data => {
            return {
                id: data,
                name: items[data].name,
            };
        })
        : [];
}

function sanitizedItemNames(itemsList: Array<{ id: string; name: string }>) {
    return itemsList
        ? itemsList.reduce((obj, item) => {
            obj[item.id] = item.name;
            return obj;
        }, {})
        : {};
}

function removeFromAnalytics(analytics: Analytics) {
    if (analytics) {
        delete analytics.metaData.dimensions;
        delete analytics.height;
        delete analytics.width;
        return analytics;
    }
}

function getAnalyticsItems(favorite: Favorite, analytics: Analytics) {
    return favorite && analytics
        ? _.reduce(
            getSanitizedAnalyticsMetadataItems(favorite, analytics),
            (obj, item) => {
                obj[item.uid] = item;
                return obj;
            },
            {}
        )
        : {};
}

function getSanitizedAnalyticsMetadataItems(
    favorite: Favorite,
    analytics: Analytics
) {
    const sanitizedItems = [];
    const re = /^([0-9][0-9][0-9][0-9]+Q[0-9])$/g;
    const itemKeys = getMetadataItemUidAndNames(analytics);
    if (analytics && favorite) {
        _.map(itemKeys, (itemKey: { uid: string; name: string }) => {
            if (favorite) {
                _.forEach(
                    favorite.dataDimensionItems,
                    (dataDimensionItem: DataDimensionItem) => {
                        return itemKey.uid === dataDimensionItem.indicator.id
                            ? sanitizedItems.push({
                                name: itemKey.name,
                                uid: itemKey.uid,
                                description: dataDimensionItem.indicator.description
                                    ? dataDimensionItem.indicator.description
                                    : '',
                                dimensionItemType:
                                    dataDimensionItem.indicator.dimensionItemType,
                                totalAggregationType: 'SUM',
                            })
                            : itemKey.uid === 'ou'
                                ? sanitizedItems.push({
                                    name: itemKey.name,
                                    uid: itemKey.uid,
                                    dimensionType: 'ORGANISATION_UNIT',
                                })
                                : itemKey.uid === 'pe'
                                    ? sanitizedItems.push({
                                        name: itemKey.name,
                                        uid: itemKey.uid,
                                        dimensionType: 'PERIOD',
                                    })
                                    : itemKey.uid === 'dx'
                                        ? sanitizedItems.push({
                                            name: itemKey.name,
                                            uid: itemKey.uid,
                                            dimensionType: 'DATA_X',
                                        })
                                        : regexCheck(re, itemKey.uid)
                                            ? sanitizedItems.push({
                                                name: itemKey.name,
                                                uid: itemKey.uid,
                                                code: itemKey.uid,
                                                dimensionItemType: 'PERIOD',
                                                totalAggregationType: 'SUM',
                                            })
                                            : {};
                    }
                );
            }
        });
        return sanitizedItems.length >= 1
            ? _.uniqWith(sanitizedItems, _.isEqual)
            : [];
    }
}

function regexCheck(re, value) {
    return re.test(value);
}

function getMetadataItemUidAndNames(analytics: Analytics) {
    return analytics
        ? Object.keys(analytics.metaData.items).map(data => {
            return {
                uid: data,
                name: analytics.metaData.items[data].name,
            };
        })
        : [];
}
