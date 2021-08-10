import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../shared/service/authentication.service';
import { CommonService } from '../shared/service/common.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService implements CanActivate {
  defaultRedirectUrl = '/dashboard';

  constructor(private readonly _authService: AuthenticationService, private readonly _router: Router,
    private readonly _commonService: CommonService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (state.url !== this.defaultRedirectUrl) {
      const isAccessible = true;  //this._authService.IsAccessibleUrl(state.url);
      if (isAccessible) {
        return true;
      } else {
        this._commonService.showError("Access Denied!!");
        this._router.navigate([this.defaultRedirectUrl]);
        return false;
      }
    } else {
      return true;
    }
  }

}
