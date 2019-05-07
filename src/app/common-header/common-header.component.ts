import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-service/auth.service';


@Component({
  selector: 'app-common-header',
  templateUrl: './common-header.component.html',
  styleUrls: ['./common-header.component.css']
})
export class CommonHeaderComponent implements OnInit {

  constructor(public authService: AuthService) { }

  displayName() {
    if (this.authService.isLoggedIn) {
      return this.authService.userData.email;
    }
    return 'Account';
  }

  ngOnInit() {
  }

}
