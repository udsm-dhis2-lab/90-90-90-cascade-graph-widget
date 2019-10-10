import { BaseState, initialBaseState } from './base.state';
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Analytics } from 'src/app/core/models/analytics.model';

export interface AnalyticsState extends BaseState, EntityState<Analytics> {
    chartAnalytics: Analytics;
}

export const adapter: EntityAdapter<Analytics> = createEntityAdapter<Analytics>();

export const initialAnalyticsState: AnalyticsState = adapter.getInitialState({
    ...initialBaseState,
    chartAnalytics: null,
});
