import { createReducer, on } from '@ngrx/store';
import { loadingBaseState, loadedBaseState, errorBaseState } from '../states/base.state';
import { LoadFavoriteAnalytics, LoadFavoriteAnalyticsSuccess, LoadFavoriteAnalyticsFail } from '../actions/analytics.action';
import { AnalyticsState, initialAnalyticsState } from '../states/analytics.state';

export const reducer = createReducer(
    initialAnalyticsState,
    on(LoadFavoriteAnalytics, state => ({
        ...state,
        ...loadingBaseState
    })),
    on(LoadFavoriteAnalyticsSuccess, (state, { chartAnalytics }) => ({
        ...state,
        ...loadedBaseState,
        chartAnalytics
    })),
    on(LoadFavoriteAnalyticsFail, (state, { error }) => ({
        ...state,
        ...errorBaseState,
        error
    }))
);

export function analyticsReducer(state: AnalyticsState, action): AnalyticsState {
    return reducer(state, action);
}
