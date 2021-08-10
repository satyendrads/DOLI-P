import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './shared/service/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  //isUserAuthenticated: boolean = false;

  constructor(private router: Router, public readonly _authenticationService: AuthenticationService) {
    // router.events.forEach((event) => {
    //   if (event instanceof NavigationStart) {
    //     if ((event.url === '/login') || (event.url === '/') || (event.url === '/forgot-password') ||
    //       (event.url === '/error-pages/404') || (event.url === '/error-pages/500')) {
    //       this.isUserAuthenticated = false;
    //     }
    //     else {
    //       this.isUserAuthenticated = this._authenticationService.IsAuthenticated;
    //     }
    //   }
    // });
  }

  ngOnInit() {
    // // Scroll to top after route change
    // this.router.events.subscribe((evt) => {
    //   if (!(evt instanceof NavigationEnd)) {
    //     return;
    //   }
    //   window.scrollTo(0, 0);
    // });
  }

}
