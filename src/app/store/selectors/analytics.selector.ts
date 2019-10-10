import { createSelector } from '@ngrx/store';
import { getRootState, State } from '../reducers';
import { AnalyticsState, adapter } from '../states/analytics.state';

export const getAnalyticsSnapshot = createSelector(
    getRootState,
    (state: State) => state.analytics
);

export const {
    selectEntities: getAnalyticsEntities,
    selectAll: getAllAnalytics,
    selectIds: getAnalyticsIds,
    selectTotal: getTotalAnalytics,
} = adapter.getSelectors(getAnalyticsSnapshot);

export const getAnalytics = createSelector(
    getAnalyticsSnapshot,
    (analyticsState: AnalyticsState) => analyticsState.chartAnalytics
);

export const getAnalyticsLoading = createSelector(
    getAnalyticsSnapshot,
    (analyticsState: AnalyticsState) => analyticsState.loading
);

export const getAnalyticsLoaded = createSelector(
    getAnalyticsSnapshot,
    (analyticsState: AnalyticsState) => analyticsState.loaded
);

export const getAnalyticsHasError = createSelector(
    getAnalyticsSnapshot,
    (analyticsState: AnalyticsState) => analyticsState.hasError
);

export const getAnalyticsError = createSelector(
    getAnalyticsSnapshot,
    (analyticsState: AnalyticsState) => analyticsState.error
);
