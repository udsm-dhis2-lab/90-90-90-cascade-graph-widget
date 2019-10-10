import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@hisptz/ngx-dhis2-http-client';
import { Observable } from 'rxjs';
import { Favorite } from '../../models/favorite.model';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  constructor(private httpClient: NgxDhis2HttpClientService) {}

  getCascadeFavorite(): Observable<Favorite> {
    const favoriteURL = `charts/XB4mc3920AY.json?fields=*`;
    return this.httpClient.get(favoriteURL);
  }
}
