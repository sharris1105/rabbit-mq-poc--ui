import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../../../constants';
import { VersionInfoModel } from '../../models/version-info.model';

@Injectable({
  providedIn: 'root'
})

export class ExampleDataService {

  constructor(private readonly http: HttpClient) { }

  getApiVersion(): Promise<VersionInfoModel> {
    return this.http
      .get<VersionInfoModel>(`${Constants.API_PATH_BASE}Info/GetVersionInfo`)
      .toPromise();
  }

  badApiCall(): Promise<any> {
    return this.http
      .get('some-bad-url.com')
      .toPromise();
  }
}
