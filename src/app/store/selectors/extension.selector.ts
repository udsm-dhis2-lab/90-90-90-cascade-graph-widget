import { createSelector } from '@ngrx/store';
import { getRootState, State } from '../reducers';
import { ExtensionState, adapter } from '../states/extension.state';

export const getExtensionSnapshot = createSelector(
    getRootState,
    (state: State) => state.extension
);

export const {
    selectEntities: getExtensionEntities,
    selectAll: getAllExtension,
    selectIds: getExtensionIds,
    selectTotal: getTotalExtension,
} = adapter.getSelectors(getExtensionSnapshot);

export const getListOfExtension = createSelector(
    getExtensionSnapshot,
    (extensionState: ExtensionState) => extensionState.chartExtension
);

export const getExtensionLoading = createSelector(
    getExtensionSnapshot,
    (extensionState: ExtensionState) => extensionState.loading
);

export const getExtensionLoaded = createSelector(
    getExtensionSnapshot,
    (extensionState: ExtensionState) => extensionState.loaded
);

export const getExtensionHasError = createSelector(
    getExtensionSnapshot,
    (extensionState: ExtensionState) => extensionState.hasError
);

export const getExtensionError = createSelector(
    getExtensionSnapshot,
    (extensionState: ExtensionState) => extensionState.error
);
