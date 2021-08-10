import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './content/login/login.component';
import { DashboardComponent } from './content/dashboard/dashboard.component';
import { UserComponent } from './content/user/user.component';
import { AddUpdateUserComponent } from './content/user/add-update-user/add-update-user.component';
import { ResetPasswordComponent } from './content/reset-password/reset-password.component';
import { ConstantsComponent } from './content/constants/constants.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'reset-password/:id', component: ResetPasswordComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'user', component: UserComponent },
  { path: 'user/add', component: AddUpdateUserComponent },
  { path: 'user/update/:id', component: AddUpdateUserComponent },
  { path: 'constants', component: ConstantsComponent },

];

@NgModule({
  imports: [BrowserModule, FormsModule, RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
