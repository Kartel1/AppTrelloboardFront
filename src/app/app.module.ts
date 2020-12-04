import { BackendService } from './services/backend.service';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HeaderComponent } from './header/header.component';
import { AuthGuard } from './services/auth-guard.service';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardsComponent } from './boards/boards.component';
import { ChartComponent } from './chart/chart.component';
import { ProfileTableComponent } from './profile/profile-table/profile-table.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { ChartsModule } from 'ng2-charts';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    HeaderComponent,
    HomeComponent,
    ProfileComponent,
    BoardsComponent,
    ChartComponent,
    ProfileTableComponent,
    UserEditComponent,
    FooterComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    BackendService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
