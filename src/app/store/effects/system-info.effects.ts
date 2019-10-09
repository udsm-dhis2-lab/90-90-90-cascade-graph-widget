import { Injectable } from '@angular/core';
import {
  NgxDhis2HttpClientService,
} from '@hisptz/ngx-dhis2-http-client';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { addSystemInfo, loadSystemInfo, loadSystemInfoFail } from '../actions';
import { SystemInfo } from 'src/app/core/models/system-info.model';

@Injectable()
export class SystemInfoEffects implements OnInitEffects {
  // loadSystemInfo$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(loadSystemInfo),
  //     switchMap(() =>
  //       this.httpClient.systemInfo().pipe(
  //         map((systemInfo: SystemInfo) =>
  //           addSystemInfo({
  //             systemInfo
  //           })
  //         ),
  //         catchError((error: any) => of(loadSystemInfoFail({ error })))
  //       )
  //     )
  //   )
  // );

  ngrxOnInitEffects() {
    return loadSystemInfo();
  }

  constructor(
    private actions$: Actions,
    private httpClient: NgxDhis2HttpClientService
  ) {}
}
