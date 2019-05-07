import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChefProfileComponent } from './chef-profile.component';

describe('ChefProfileComponent', () => {
  let component: ChefProfileComponent;
  let fixture: ComponentFixture<ChefProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChefProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChefProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
