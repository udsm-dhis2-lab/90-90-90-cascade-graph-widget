import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  getFavorites,
  getAnalytics,
  getExtension,
  getFavoriteLoaded,
  getAnalyticsLoaded,
  getExtensionLoaded,
  getFavoriteLoading,
  getAnalyticsLoading,
  getExtensionLoading,
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
import {
  getSanitizedAnalytics,
  sanitizeAnalyticsBasedOnConfiguration,
} from 'src/app/core/helpers/sanitize-analytics';
import { GenerateCascadeGraph } from '@iapps/visualization/cascade';
import { extendOtherChartOptions } from 'src/app/core/helpers/draw-chart.helper';
import { chart } from 'highcharts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  renderId: string;
  chartHeight: string;
  favorite$: Observable<Favorite>;
  analytics$: Observable<Analytics>;
  extension$: Observable<Extension>;
  favoriteLoaded$: Observable<boolean>;
  analyticsLoaded$: Observable<boolean>;
  extensionLoaded$: Observable<boolean>;
  favoriteLoading$: Observable<boolean>;
  analyticsLoading$: Observable<boolean>;
  extensionLoading$: Observable<boolean>;
  progressMSG: string;

  cascadeChartOptions: any;

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.store.dispatch(LoadFavorite());
    this.favorite$ = this.store.select(getFavorites);
    this.analytics$ = this.store.select(getAnalytics);
    this.extension$ = this.store.select(getExtension);
    this.favoriteLoaded$ = this.store.select(getFavoriteLoaded);
    this.analyticsLoaded$ = this.store.select(getAnalyticsLoaded);
    this.extensionLoaded$ = this.store.select(getExtensionLoaded);
    this.favoriteLoading$ = this.store.select(getFavoriteLoading);
    this.analyticsLoading$ = this.store.select(getAnalyticsLoading);
    this.extensionLoading$ = this.store.select(getExtensionLoading);
    this.chartHeight = '520px';
    this.progressMSG =
      'Cascade Analysis to Quantify Progress and Gaps towards the 90-90-90 Targets';

    this.favorite$.subscribe((favorite: Favorite) => {
      if (favorite) {
        this.renderId = favorite.id;

        const visualizationLayout: VisualizationLayout = getVisualizationLayout();
        const visualizationConfiguration: ChartConfiguration = getChartConfiguration(
          favorite,
          favorite.id,
          visualizationLayout
        );

        this.analytics$.subscribe((analytics: Analytics) => {
          if (analytics) {
            this.extension$.subscribe((extensions: any) => {
              if (extensions) {
                const cascadeExtension: Extension = _.filter(
                  extensions,
                  (extension: Extension) => extension.id === favorite.id
                )[0];

                const sanitizedAnalytics = getSanitizedAnalytics(
                  favorite,
                  analytics
                );

                const chartAnalytics = sanitizeAnalyticsBasedOnConfiguration(
                  sanitizedAnalytics,
                  visualizationConfiguration
                );

                const initialChartObject = drawChart(
                  chartAnalytics,
                  visualizationConfiguration,
                  cascadeExtension
                );

                const chartObject = extendOtherChartOptions(
                  initialChartObject,
                  chartAnalytics,
                  visualizationConfiguration
                );
                this.cascadeChartOptions = this.drawCascadeChart(
                  cascadeExtension,
                  chartObject
                );
                chart(this.renderId, this.cascadeChartOptions);
              }
            });
          }
        });
      }
    });
  }

  drawCascadeChart(chartExtension: Extension, chartObject: any) {
    return GenerateCascadeGraph(
      true,
      true,
      'nacp',
      'dhis2',
      'column',
      chartObject,
      chartExtension,
      1600000
    );
  }
}
