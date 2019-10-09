import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@hisptz/ngx-dhis2-http-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  constructor(private httpClient: NgxDhis2HttpClientService) {}

  getCascadeFavorite(): Observable<any> {
    const favoriteURL = `charts/XB4mc3920AY.json?fields=*`;
    return this.httpClient.get(favoriteURL);
  }
}
