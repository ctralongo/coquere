import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  ngOnInit() {
    console.log('logged in');
  }
}
