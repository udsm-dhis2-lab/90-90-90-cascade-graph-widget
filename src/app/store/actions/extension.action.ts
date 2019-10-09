import { createAction, props, Action } from '@ngrx/store';
import { Analytics } from 'src/app/core/models/analytics.model';

export enum ExtensionActionTypes {
    LoadFavoriteExtension = '[DASHBOARD FAVORITES EXTENSION] Load Dashboard Favorites Extensions',
    LoadFavoriteExtensionSuccess = '[DASHBOARD FAVORITES EXTENSION] Load Dashboard Favorite Extensions Success',
    LoadFavoriteExtensionFail = '[DASHBOARD FAVORITES EXTENSION] Load Dashboard Favorite Extensions Fail',
}

export class LoadFavoriteAnalytics implements Action {
    readonly type = ExtensionActionTypes.LoadFavoriteExtension;
    constructor(public payload: Analytics) { }
}

export class LoadFavoriteAnalyticsSuccess implements Action {
    readonly type = ExtensionActionTypes.LoadFavoriteExtensionSuccess;
    constructor(public payload: Analytics) { }
}

export class LoadFavoriteAnalyticsFail implements Action {
    readonly type = ExtensionActionTypes.LoadFavoriteExtensionFail;
    constructor(public payload: string) { }
}
