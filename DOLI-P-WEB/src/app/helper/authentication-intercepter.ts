import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

export class AuthenticationIntercepter implements HttpInterceptor {
  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add auth header with jwt if user is logged in and request is to api url
    
    const userId = localStorage.getItem('UserId') != null ? localStorage.getItem('UserId') : null;
    const Token = localStorage.getItem('Token') != null ? localStorage.getItem('Token') : null;
    
    if (Token != null) {
      req = req.clone({
        setHeaders: {
          Authorization:  `DiscoveryPhase ${Token}` ,
          UserId: userId
        }
      });
    }
    return next.handle(req).pipe();
  }
}
