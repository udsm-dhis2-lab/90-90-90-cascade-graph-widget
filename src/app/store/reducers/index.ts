import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';

import { environment } from '../../../environments/environment';
import { SystemInfoState } from '../states/system-info.state';
import { UserState } from '../states/user.state';
import { systemInfoReducer } from './system-info.reducer';
import { userReducer } from './user.reducer';
import { FavoriteState } from '../states/favorite.state';
import { favoriteReducer } from './favorite.reducer';
import { extensionReducer } from './extension.reducer';
import { ExtensionState } from '../states/extension.state';
import { AnalyticsState } from '../states/analytics.state';
import { analyticsReducer } from './analytics.reducer';

export interface State {
  user: UserState;
  systemInfo: SystemInfoState;
  router: RouterReducerState;
  favorite: FavoriteState;
  extension: ExtensionState;
  analytics: AnalyticsState;
}

export const reducers: ActionReducerMap<State> = {
  user: userReducer,
  systemInfo: systemInfoReducer,
  router: routerReducer,
  favorite: favoriteReducer,
  extension: extensionReducer,
  analytics: analyticsReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [storeFreeze]
  : [];

/**
 * Root state selector
 */
export const getRootState = (state: State) => state;
