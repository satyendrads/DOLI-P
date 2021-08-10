import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {

  constructor(private readonly _authService: AuthenticationService) { }

  ngOnInit() {
  }

  logout() {
    this._authService.LogOut();
  }

}
