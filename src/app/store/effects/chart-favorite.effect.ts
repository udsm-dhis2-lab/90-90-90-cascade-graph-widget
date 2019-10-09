import { Injectable } from '@angular/core';
import {
    Actions,
    Effect,
    ofType,
    OnInitEffects,
    createEffect,
} from '@ngrx/effects';
import { FavoriteService } from 'src/app/core/services/favorite/favorite.service';
import { of } from 'rxjs';
import {
    LoadDashboardFavoriteSuccess,
    LoadDashboardFavorite,
    LoadDashboardFavoriteFail,
} from '../actions/favorite.actions';
import { map, catchError, switchMap } from 'rxjs/operators';
import { Favorite } from 'src/app/core/models/favorite.model';
import { ErrorMessage } from 'src/app/core/models/error-message.model';

@Injectable()
export class FavoriteEffects implements OnInitEffects {

    constructor(
        private actions$: Actions,
        private favoriteService: FavoriteService
    ) { }

    loadFavorites$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LoadDashboardFavorite),
            switchMap(action =>
                this.favoriteService.getCascadeFavorite().pipe(
                    map((favorite: Favorite) =>
                        LoadDashboardFavoriteSuccess({ chartFavorite: favorite })
                    ),
                    catchError((error: ErrorMessage) =>
                        of(LoadDashboardFavoriteFail({ error }))
                    )
                )
            )
        )
    );

    ngrxOnInitEffects() {
        return LoadDashboardFavorite();
    }
}
