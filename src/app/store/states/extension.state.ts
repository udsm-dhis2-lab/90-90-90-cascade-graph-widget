import { BaseState, initialBaseState } from './base.state';
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Extension } from 'src/app/core/models/extension.model';

export interface ExtensionState extends BaseState, EntityState<Extension> {
    chartExtension: Extension;
}

export const adapter: EntityAdapter<Extension> = createEntityAdapter<Extension>();

export const initialExtensionState: ExtensionState = adapter.getInitialState({
    ...initialBaseState,
    chartExtension: null,
});
