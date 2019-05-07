import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import {Observable} from 'rxjs';
import {AngularFireDatabase} from '@angular/fire/database';
import {AuthService} from '../auth-service/auth.service';

@Component({
  selector: 'app-chef-profile',
  templateUrl: './chef-profile.component.html',
  styleUrls: ['./chef-profile.component.css']
})
export class ChefProfileComponent implements OnInit {

  chef_name = '';
  chef_bio = '';
  chef_dish1 = '';
  chef_dish2 = '';
  chef_dish3 = '';

  chef_pic1 = '';
  chef_pic2 = '';
  chef_pic3 = '';

  chef_dishpic1 = '';
  chef_dishpic2 = '';
  chef_dishpic3 = '';

  chef_dish1_desc = '';
  chef_dish2_desc = '';
  chef_dish3_desc = '';

  chef_price = '';
  chef_phone = '';
  chef_email = '';
  chef_specialty = '';

  chef_profilePic = '';

  displayContactInfo = false;


  constructor(private route: ActivatedRoute,
              private router: Router,
              public db: AngularFireDatabase,
              public authService: AuthService) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');
    console.log('ID IS', id);

    // const chef_object = this.db.object('chef' + id);
    //
    // console.log(chef_object['name']);
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
        this.chef_dishpic1 = data['dishPic1'];
        this.chef_dishpic2 = data['dishPic2'];
        this.chef_dishpic3 = data['dishPic3'];
        subscribe.unsubscribe();
      }
    );




    // if (id === '1') {
    //
    //   this.chef_name = 'Gordon Ramsay';
    //   this.chef_bio = 'Yes, that Gordon Ramsay! Now is your chance to have THE Gordon Ramsay at your dinner table. Born in Scotland, his restaurants have been awarded 16 Michelin stars in total and currently hold a total of 7. His signature restaurant, Restaurant Gordon Ramsay in Chelsea, London, has held three Michelin stars since 2001.';
    //
    //   this.chef_dish1 = 'Spaghetti and Meatballs';
    //   this.chef_dish2 = 'Italian Pizza';
    //   this.chef_dish3 = 'Classic Lasagna';
    //
    //   this.chef_dish1_desc = 'An italian classic, home-made and prepared by the world-famous chef, Gordon Ramsay.';
    //   this.chef_dish2_desc = 'Imagine getting to eat the world\'s best pizza. Stop imagining! The world\'s greatest pizza. Now at your party.';
    //   this.chef_dish3_desc = 'Everyone loves lasagna! Now imagine having Gordon Ramsay\'s lasagna, right at your dinner party.';
    //
    //   this.chef_pic1 = '/assets/images/chefs/ramsay/profile.jpg';
    //   this.chef_pic2 = '/assets/images/chefs/ramsay/profile_2.jpg';
    //   this.chef_pic3 = '/assets/images/chefs/ramsay/profile_3.jpg';
    //
    //   this.chef_dishpic1 = '/assets/images/chefs/ramsay/dishes/spaghetti.jpg';
    //   this.chef_dishpic2 = '/assets/images/chefs/ramsay/dishes/pizza.jpg';
    //   this.chef_dishpic3 = '/assets/images/chefs/ramsay/dishes/lasagna.jpg';
    // }
    // if (id === '2') {
    //
    //   this.chef_name = 'Guy Fieri';
    //   this.chef_bio = 'Guy Ramsay Fieri is an American restaurateur, author, game show host, and an Emmy Award winning television personality. He co-owns three restaurants in California, licenses his name to restaurants in New York City and Las Vegas, Nevada, and is known for his television series on the Food Network.';
    //   this.chef_dish1 = 'Orange BBQ Henny Wings';
    //   this.chef_dish2 = 'Sushi Tacos';
    //   this.chef_dish3 = 'Adult Shaved Ice';
    //
    //   this.chef_dish1_desc = 'Bet you\'ve never had Henny wings before! What better place to enjoy them than at your graduation dinner?';
    //   this.chef_dish2_desc = 'Sushi tacos, anyone? At your kid\'s birthday party? I got you covered.';
    //   this.chef_dish3_desc = 'Alcoholic shaved ice? Yes please. For children? Non-alcoholic served too.';
    //
    //   this.chef_pic1 = 'https://assets3.thrillist.com/v1/image/2670144/size/tmg-gift_guide_default.jpg';
    //   this.chef_pic2 = 'https://peopledotcom.files.wordpress.com/2016/07/guy-fieri-1333x2000.jpg?w=1333';
    //   this.chef_pic3 = 'http://www.seatrade-cruise.com/media/k2/items/cache/82a45ae0214015d3a9eabbc495704c8b_XL.jpg';
    //
    //   this.chef_dishpic1 = 'https://carnaldish.com/wp-content/uploads/2016/10/orangehenny1a.jpg';
    //   this.chef_dishpic2 = 'https://cdn.kiwilimon.com/recetaimagen/31764/th5-640x426-36474.jpg';
    //   this.chef_dishpic3 = 'https://pbs.twimg.com/media/DCS-fwWVYAAJaq-.jpg';
    // }

  }

}
