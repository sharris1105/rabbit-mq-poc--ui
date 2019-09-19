import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private readonly _authService: AuthService) { }

  canActivate(): boolean {
    if (this._authService.getCurrentSession().isAuthenticated) {
      return true;
    }

    return false;
  }
}
