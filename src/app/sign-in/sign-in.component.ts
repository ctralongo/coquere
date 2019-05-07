import {Component, OnChanges, OnInit} from '@angular/core';
import { AuthService } from '../auth-service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})

export class SignInComponent implements OnInit, OnChanges {

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  ngOnInit() {}

  ngOnChanges() {
    console.log('hi');
    if (this.authService.isLoggedIn) {
      console.log('hel');
      this.router.navigate(['home']);
    }
  }
}
