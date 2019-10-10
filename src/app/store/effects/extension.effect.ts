import { Injectable } from '@angular/core';
import { Actions, ofType, OnInitEffects, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { ErrorMessage } from 'src/app/core/models/error-message.model';
import { ExtensionService } from 'src/app/core/services/extension/extension.service';
import {
    LoadFavoriteExtension,
    LoadFavoriteExtensionSuccess,
    LoadFavoriteExtensionFail,
} from '../actions/extension.action';
import { Extension } from 'src/app/core/models/extension.model';

@Injectable()
export class ExtensionEffects implements OnInitEffects {
    constructor(
        private actions$: Actions,
        private extensionService: ExtensionService
    ) { }

    loadExtension$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LoadFavoriteExtension),
            switchMap(() =>
                this.extensionService.getExtensions().pipe(
                    map((favorite: Extension) =>
                        LoadFavoriteExtensionSuccess({ chartExtension: favorite })
                    ),
                    catchError((error: ErrorMessage) =>
                        of(LoadFavoriteExtensionFail({ error }))
                    )
                )
            )
        )
    );

    ngrxOnInitEffects() {
        return LoadFavoriteExtension();
    }
}
