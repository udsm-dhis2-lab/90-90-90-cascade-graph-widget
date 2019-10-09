import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@hisptz/ngx-dhis2-http-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  constructor(private httpClient: NgxDhis2HttpClientService) {}

  getCascadeFavorite(): Observable<any> {
    const favoriteURL =
      'analytics?dimension=dx:xXrwhpYL4UD;itIVeB2QV3B;Zq7AbV0d2SS;BHUTFEEteC8&dimension=pe:LAST_QUARTER&filter=ou:m0frOspS7JY&displayProperty=NAME&skipMeta=true&includeNumDen=true';
    return this.httpClient.get(favoriteURL);
  }
}
