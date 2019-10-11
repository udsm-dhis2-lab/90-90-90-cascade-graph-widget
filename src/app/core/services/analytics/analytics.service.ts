import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@hisptz/ngx-dhis2-http-client';
import { Analytics } from '../../models/analytics.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  constructor(private httpClient: NgxDhis2HttpClientService) {}

  getCascadeAnalytics(): Observable<Analytics> {
    const data = `xXrwhpYL4UD;itIVeB2QV3B;Zq7AbV0d2SS;BHUTFEEteC8`;
    const period = `LAST_QUARTER`;
    const orgUnit = `m0frOspS7JY`;
    const urlMetadata = `displayProperty=NAME&skipMeta=false&includeNumDen=false`;
    const analyticsURL = `analytics?dimension=dx:${data}&dimension=pe:${period}&filter=ou:${orgUnit}&${urlMetadata}`;
    return this.httpClient.get(analyticsURL);
  }
}
