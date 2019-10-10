import { Injectable } from '@angular/core';
import { Actions, ofType, OnInitEffects, createEffect } from '@ngrx/effects';
import { FavoriteService } from 'src/app/core/services/favorite/favorite.service';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { Favorite } from 'src/app/core/models/favorite.model';
import { ErrorMessage } from 'src/app/core/models/error-message.model';
import {
    LoadFavorite,
    LoadFavoriteSuccess,
    LoadFavoriteFail,
} from '../actions/favorite.actions';

@Injectable()
export class FavoriteEffects implements OnInitEffects {
    constructor(
        private actions$: Actions,
        private favoriteService: FavoriteService
    ) { }

    loadFavorites$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LoadFavorite),
            switchMap(() =>
                this.favoriteService.getCascadeFavorite().pipe(
                    map((favorite: Favorite) =>
                        LoadFavoriteSuccess({ chartFavorite: favorite })
                    ),
                    catchError((error: ErrorMessage) => of(LoadFavoriteFail({ error })))
                )
            )
        )
    );

    ngrxOnInitEffects() {
        return LoadFavorite();
    }
}
