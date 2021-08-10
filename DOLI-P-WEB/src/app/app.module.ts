import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './content/login/login.component';
import { RegisterComponent } from './content/register/register.component';
import { ForgotPasswordComponent } from './content/forgot-password/forgot-password.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { DashboardComponent } from './content/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseService } from './shared/service/base.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthenticationIntercepter } from './helper/authentication-intercepter';
import { UserComponent } from './content/user/user.component';
import { AddUpdateUserComponent } from './content/user/add-update-user/add-update-user.component';
import { ConfirmationPopupComponent } from './shared/confirmation-popup/confirmation-popup.component';
import { MessagePopupComponent } from './shared/message-popup/message-popup.component';
import { ResetPasswordComponent } from './content/reset-password/reset-password.component';
import { AuthGuardService } from './helper/auth-guard.service';
import { ConstantsComponent } from './content/constants/constants.component';
import { PortfolioComponent } from './content/portfolio/portfolio.component';
import { CustomisationComponent } from './content/customisation/customisation.component';
import { AdvisersComponent } from './content/advisers/advisers.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    LoaderComponent,
    DashboardComponent,
    UserComponent,
    AddUpdateUserComponent,
    ConfirmationPopupComponent,
    MessagePopupComponent,
    ResetPasswordComponent,
    ConstantsComponent,
    PortfolioComponent,
    CustomisationComponent,
    AdvisersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [BaseService, AuthGuardService, { provide: HTTP_INTERCEPTORS, useClass: AuthenticationIntercepter, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
