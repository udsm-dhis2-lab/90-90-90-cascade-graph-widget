import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  getFavorites,
  getAnalytics,
  getExtension,
} from 'src/app/store/selectors';
import { State } from 'src/app/store/reducers';
import { LoadFavorite } from 'src/app/store/actions/favorite.actions';
import { Observable } from 'rxjs';
import { Favorite } from 'src/app/core/models/favorite.model';
import { getChartConfiguration } from 'src/app/core/helpers/configuration.helpers';
import { VisualizationLayout } from 'src/app/core/models/layout.model';
import { getVisualizationLayout } from 'src/app/core/helpers/layout.helper';
import { ChartConfiguration } from 'src/app/core/models/chart-configuration.model';
import { Analytics } from 'src/app/core/models/analytics.model';
import { Extension } from 'src/app/core/models/extension.model';
import { drawChart } from 'src/app/core/helpers/draw-visualization.helper';
import * as _ from 'lodash';
import { getSanitizedAnalytics } from 'src/app/core/helpers/sanitized-analytics';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  favorite$: Observable<Favorite>;
  analytics$: Observable<Analytics>;
  extension$: Observable<Extension>;

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.store.dispatch(LoadFavorite());
    this.favorite$ = this.store.select(getFavorites);
    this.analytics$ = this.store.select(getAnalytics);
    this.extension$ = this.store.select(getExtension);

    this.favorite$.subscribe((favorite: Favorite) => {
      if (favorite) {
        const visualizationLayout: VisualizationLayout = getVisualizationLayout();
        const visualizationConfiguration: ChartConfiguration = getChartConfiguration(
          favorite,
          favorite.id,
          visualizationLayout
        );

        this.analytics$.subscribe((analytic: Analytics) => {
          if (analytic) {
            this.extension$.subscribe((extensions: any) => {
              if (extensions) {
                const cascadeExtension: Extension = _.filter(
                  extensions,
                  (extension: Extension) => extension.id === favorite.id
                )[0];
                const final = drawChart(
                  analytic,
                  visualizationConfiguration,
                  cascadeExtension
                );
              }
            });
          }
        });
      }
    });
  }
}
