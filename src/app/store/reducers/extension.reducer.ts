import { createReducer, on } from '@ngrx/store';
import { loadingBaseState, loadedBaseState, errorBaseState } from '../states/base.state';
import { LoadFavoriteExtension, LoadFavoriteExtensionSuccess, LoadFavoriteExtensionFail } from '../actions';
import { ExtensionState, initialExtensionState } from '../states/extension.state';

export const reducer = createReducer(
    initialExtensionState,
    on(LoadFavoriteExtension, state => ({
        ...state,
        ...loadingBaseState
    })),
    on(LoadFavoriteExtensionSuccess, (state, { chartExtension }) => ({
        ...state,
        ...loadedBaseState,
        chartExtension
    })),
    on(LoadFavoriteExtensionFail, (state, { error }) => ({
        ...state,
        ...errorBaseState,
        error
    }))
);

export function extensionReducer(state: ExtensionState, action): ExtensionState {
    return reducer(state, action);
}
