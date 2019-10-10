import { Injectable } from '@angular/core';
import {
    Actions,
    Effect,
    ofType,
    OnInitEffects,
    createEffect,
} from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { ErrorMessage } from 'src/app/core/models/error-message.model';
import { AnalyticsService } from 'src/app/core/services/analytics/analytics.service';
import { Analytics } from 'src/app/core/models/analytics.model';
import {
    LoadFavoriteAnalytics,
    LoadFavoriteAnalyticsSuccess,
    LoadFavoriteAnalyticsFail,
} from '../actions/analytics.action';

@Injectable()
export class AnalyticsEffects implements OnInitEffects {
    constructor(
        private actions$: Actions,
        private analyticsService: AnalyticsService
    ) { }

    loadExtension$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LoadFavoriteAnalytics),
            switchMap(() =>
                this.analyticsService.getCascadeAnalytics().pipe(
                    map((favorite: Analytics) =>
                        LoadFavoriteAnalyticsSuccess({ chartAnalytics: favorite })
                    ),
                    catchError((error: ErrorMessage) =>
                        of(LoadFavoriteAnalyticsFail({ error }))
                    )
                )
            )
        )
    );

    ngrxOnInitEffects() {
        return LoadFavoriteAnalytics();
    }
}
