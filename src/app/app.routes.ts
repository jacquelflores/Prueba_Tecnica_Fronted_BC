import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login';
import { UserListComponent } from './users/user-list/user-list';
import { UserFormComponent } from './users/user-form/user-form';
import { AuthGuard } from './auth/auth-guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'users', component: UserListComponent, canActivate: [AuthGuard] },
  { path: 'users/new', component: UserFormComponent, canActivate: [AuthGuard] },
  { path: 'users/edit/:id', component: UserFormComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' }
];
