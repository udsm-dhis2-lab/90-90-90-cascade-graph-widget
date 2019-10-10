import { createAction, props } from '@ngrx/store';
import { ErrorMessage } from 'src/app/core/models/error-message.model';
import { Analytics } from 'src/app/core/models/analytics.model';

export enum AnalyticsActionsDefinition {
    LoadFavoriteAnalytics = '[ANALYTICS] Load Favorites Analytics',
    LoadFavoriteAnalyticsSuccess = '[ANALYTICS] Load Favorite Analytics Success',
    LoadFavoriteAnalyticsFail = '[ANALYTICS] Load Favorite Analytics Fail',
}

export const LoadFavoriteAnalytics = createAction(
    AnalyticsActionsDefinition.LoadFavoriteAnalytics
);

export const LoadFavoriteAnalyticsSuccess = createAction(
    AnalyticsActionsDefinition.LoadFavoriteAnalyticsSuccess,
    props<{ chartAnalytics: Analytics }>()
);

export const LoadFavoriteAnalyticsFail = createAction(
    AnalyticsActionsDefinition.LoadFavoriteAnalyticsFail,
    props<{ error: ErrorMessage }>()
);
