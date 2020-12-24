import { ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  route: ActivatedRoute;
  hasVerifier = false;
  params: Params;
  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnDestroy(): void {}
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.hasVerifier = params['oauth_verifier'] === undefined ? false : true;
      this.params = params;
    });
    if (this.hasVerifier) {
      this.authService.endLoginToTrello(this.params);
    }
  }
  onRefreshFromTrello() {}
  onLoginToTrello() {
    this.authService.loginToTrello();
  }
}
