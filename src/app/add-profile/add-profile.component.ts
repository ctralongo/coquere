import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-service/auth.service';

@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.css']
})

export class AddProfileComponent implements OnInit {

  isChef = false;

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit() { }

}
