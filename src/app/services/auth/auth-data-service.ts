import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../../constants';
import { IToken } from '../../interfaces/IToken';

@Injectable()
export class AuthDataService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private readonly _http: HttpClient) { }

  getSession(sessionId: string): Observable<IToken> {
    let payload = {
      SessionId: sessionId
    };

    return this._http.post(`${Constants.WRAPPER_PATH_BASE}AppAuth/getsession`, payload, this.httpOptions);
  }
}
