import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { LoginUserDetailModel } from '../model/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  loginUserDetail: LoginUserDetailModel = new LoginUserDetailModel();
  
  constructor(private readonly _authService: AuthenticationService) {
    this.loginUserDetail = _authService.GetLoginUserDetail();
  }

  ngOnInit() {
  }

}
