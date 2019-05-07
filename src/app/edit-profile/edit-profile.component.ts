import {ChangeDetectorRef, Component, OnInit} from '@angular/core';

import { AuthService } from '../auth-service/auth.service';
import {AngularFireDatabase} from '@angular/fire/database';
import { Router } from '@angular/router';


// https://www.positronx.io/full-angular-7-firebase-authentication-system/#tc_784_07

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  chef_name = '';
  chef_bio = '';

  chef_dish1 = '';
  chef_dish2 = '';
  chef_dish3 = '';

  // chef_pic1 = '';
  // chef_pic2 = '';
  // chef_pic3 = '';

  chef_dishpic1 = '';
  chef_dishpic2 = '';
  chef_dishpic3 = '';

  chef_profilePic = '';

  chef_dish1_desc = '';
  chef_dish2_desc = '';
  chef_dish3_desc = '';

  chef_price = '';
  chef_phone = '';
  chef_email = '';
  chef_specialty = '';

  public boundCallback: Function;
  public timeStamp: Number;


  constructor(public db: AngularFireDatabase, public authService: AuthService, public router: Router, private cdRef: ChangeDetectorRef) {
    // this.items = db.list('chef').valueChanges();
    // this.chefList = db.list('chef', ref => ref.orderByChild('chef_name').equalTo('Chet')).valueChanges();
    this.getData();
    this.boundCallback = this.onUploadCallback.bind(this);
  }

  onUploadCallback() {
    console.log('THIS IS THE CALLBACK!!');
    this.getUpdatedImages();
  }

  getUpdatedImages() {
    const id = this.authService.userData.uid;
    console.log('ID IS', id);
    this.timeStamp = null;
    const subscribe = this.db.object('chef/' + id).valueChanges().subscribe(
      data => {
        this.chef_profilePic = data['profilePic'];
        this.setProfilePicture(this.chef_profilePic);
        this.chef_dishpic1 = data['dishPic1'];
        this.chef_dishpic2 = data['dishPic2'];
        this.chef_dishpic3 = data['dishPic3'];
        subscribe.unsubscribe();
      }
    );
  }

  getData() {
    const id = this.authService.userData.uid;
    console.log('ID IS', id);

    // const chef_object = this.db.object('chef' + id);
    //
    // console.log(chef_object['name']);

    // this.chef_pic1 = '/assets/images/chefs/ramsay/profile.jpg';
    // this.chef_pic2 = '/assets/images/chefs/ramsay/profile_2.jpg';
    // this.chef_pic3 = '/assets/images/chefs/ramsay/profile_3.jpg';

    // this.chef_dishpic1 = '/assets/images/chefs/ramsay/dishes/spaghetti.jpg';
    // this.chef_dishpic2 = '/assets/images/chefs/ramsay/dishes/pizza.jpg';
    // this.chef_dishpic3 = '/assets/images/chefs/ramsay/dishes/lasagna.jpg';
    this.timeStamp = null;
    const placeholder = 'https://g7ae521bbzj1gdto335ocs93-wpengine.netdna-ssl.com/wp-content/uploads/sites/8/2017/10/doctors-placeholder-banner-1024x506-1.png';
    const subscribe = this.db.object('chef/' + id).valueChanges().subscribe(
      data => {
        console.log(data);

        this.chef_name = data['name'];
        this.chef_bio = data['bio'];
        this.chef_dish1 = data['dish1'];
        this.chef_dish2 = data['dish2'];
        this.chef_dish3 = data['dish3'];

        this.chef_dish1_desc = data['dish1_desc'];
        this.chef_dish2_desc = data['dish2_desc'];
        this.chef_dish3_desc = data['dish3_desc'];

        this.chef_price = data['price'];
        this.chef_email = data['email'];
        this.chef_phone = data['phone'];

        // this.chef_pic1 = '/assets/images/chefs/ramsay/profile.jpg';
        // this.chef_pic2 = '/assets/images/chefs/ramsay/profile_2.jpg';
        // this.chef_pic3 = '/assets/images/chefs/ramsay/profile_3.jpg';


        this.chef_profilePic = data['profilePic'];
        this.setProfilePicture(this.chef_profilePic);

        this.chef_dishpic1 = data['dishPic1'];
        this.chef_dishpic2 = data['dishPic2'];
        this.chef_dishpic3 = data['dishPic3'];

        subscribe.unsubscribe();

      }
    );
  }

  ngOnInit() {
    this.getData();
  }

  async onSubmit(name, bio, dish1, dish1desc, dish2, dish2desc, dish3, dish3desc, price, phone, email) {
    // this.db.list('/chef').push({
    //   name: this.chef_name,
    //   bio: this.chef_bio,
    //   price: this.chef_price,
    //   specialty: this.chef_specialty
    // });
    await this.getData();
    const userList = this.db.list('/chef');
    if (!/^\d+\.\d{0,2}$/.test(price)) {
      price = price + '.00';
    }
    price = price.replace('$', '');
    userList.set(this.authService.userData.uid,
      {
        name: name,
        bio: bio,
        price: price,
        dish1: dish1,
        dish1_desc: dish1desc,
        dish2: dish2,
        dish2_desc: dish2desc,
        dish3: dish3,
        dish3_desc: dish3desc,
        specialty: this.chef_specialty,
        phone: phone,
        email: email,
        profilePic: this.chef_profilePic,

        dishPic1: this.chef_dishpic1,
        dishPic2: this.chef_dishpic2,
        dishPic3: this.chef_dishpic3
        // uid: this.authService.userData.uid
      });

    this.router.navigate(['profile/' + this.authService.userData.uid]);
  }

  public getProfilePicture() {
    if(this.timeStamp) {
      return this.chef_profilePic + '?' + this.timeStamp;
    }
    return this.chef_profilePic;
  }

  public setProfilePicture(url: string) {
    this.chef_profilePic = url;
    this.timeStamp = (new Date()).getTime();
  }


}
