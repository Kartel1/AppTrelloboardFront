import { ProfileTableComponent } from './profile/profile-table/profile-table.component';
import { BoardsComponent } from './boards/boards.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth-guard.service';


const routes: Routes = [
  {
    path: 'board',
    canActivate: [AuthGuard],
    component: BoardsComponent
  },
  {
    path: 'edit-profile',
    canActivate: [AuthGuard],
    component: UserEditComponent
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    component: ProfileComponent,
    children: [
      {
        path: '',
        component: ProfileTableComponent
      }
    ]
  },
  {
    path: 'sign-in',
    component: SignInComponent
  },
  { path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full'
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
