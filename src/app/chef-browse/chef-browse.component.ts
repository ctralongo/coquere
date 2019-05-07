import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AngularFireDatabase} from '@angular/fire/database';

@Component({
  selector: 'app-chef-browse',
  templateUrl: './chef-browse.component.html',
  styleUrls: ['./chef-browse.component.css']
})

export class ChefBrowseComponent implements OnInit {


  keys = [];
  chefs = [];

  @ViewChild('allchefsbtn') allchefsbtn: ElementRef;


  constructor(public db: AngularFireDatabase) {
    this.getChefs();
    // this.getFakeChefs();
  }

  triggerFalseClickAll() {
    const el: HTMLElement = this.allchefsbtn.nativeElement as HTMLElement;
    el.click();
  }

  async getChefs() {
    await this.db.list('/chef').snapshotChanges().subscribe(items => {
    items.forEach(item => {
      console.log(item['key']);
      this.keys.push(item['key']);
      // this.chefs.push(item);
      });
    });

    await this.db.list('/chef').valueChanges().subscribe(items => {
      items.forEach(item => {
        console.log(item);
        this.chefs.push(item);
      });
    });
  }

  getFakeChefs() {
    const chef1 = {name: 'Chef Faker', price: '$50.00'};
    const chef2 = {name: 'Chef Faker 2', price: '$70.00'};

    this.chefs = [chef1, chef2,chef2,chef2,chef2,chef2];
    this.keys = [0,1,2,3,4,5];


  }

  ngOnInit() {}

}
