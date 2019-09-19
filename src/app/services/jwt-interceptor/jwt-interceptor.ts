import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../../constants';
import { AuthService } from '../auth/auth.service';

@Injectable()

export class JwtInterceptorService implements HttpInterceptor {
  constructor(private readonly _authService: AuthService) { }

  intercept(request: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {
    const currentSession = this._authService.getCurrentSession();
    if (currentSession.isAuthenticated && currentSession.appCredentials.jwtToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `${Constants.JWT_TOKEN_PREFIX} ${currentSession.appCredentials.jwtToken}`
        }
      })
    }

    return handler.handle(request);
  }
}
