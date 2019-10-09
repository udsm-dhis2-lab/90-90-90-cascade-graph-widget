import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { FavoriteService } from 'src/app/core/services/favorite/favorite.service';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { LoadFavoriteAnalytics } from '../actions/analytics.action';
import {
    FavoriteActionTypes,
    LoadDashboardFavoriteSuccess,
    LoadDashboardFavoriteFail,
} from '../actions/favorite.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { ChartFavorite } from 'src/app/core/models/favorite.model';

@Injectable()
export class DQADashboardEffects {
    /**
       *
       * @param actions$
        // tslint:disable-next-line: no-redundant-jsdoc
       * @param favoriteService
        // tslint:disable-next-line: no-redundant-jsdoc
       */
    constructor(
        private actions$: Actions,
        private favoriteService: FavoriteService
    ) { }

    /**
     * Effect to load 90-90-90 Cascade Favorite
     */
    @Effect()
    loadFavorites$: Observable<any> = this.actions$.pipe(
        ofType<LoadFavoriteAnalytics>(FavoriteActionTypes.LoadDashboardFavorite),
        mergeMap((action: LoadFavoriteAnalytics) =>
            this.favoriteService.getCascadeFavorite().pipe(
                map((favorite: any) => new LoadDashboardFavoriteSuccess(favorite)),
                catchError(err => of(new LoadDashboardFavoriteFail(err)))
            )
        )
    );
}
