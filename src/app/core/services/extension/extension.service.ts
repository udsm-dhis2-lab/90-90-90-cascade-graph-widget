import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@hisptz/ngx-dhis2-http-client';
import { Observable, forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class ExtensionService {
  extensionURL = `dataStore/extensions`;
  constructor(private httpClient: NgxDhis2HttpClientService) {}

  getExtensions(): Observable<any> {
    return this.httpClient.get(this.extensionURL).pipe(
      switchMap((extensions: Array<string>) =>
        forkJoin<any>(
          _.map(extensions, (extensionUID: string) => {
            return this.httpClient.get(`${this.extensionURL}/${extensionUID}`);
          })
        )
      )
    );
  }
}
