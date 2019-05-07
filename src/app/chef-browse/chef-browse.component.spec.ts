import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChefBrowseComponent } from './chef-browse.component';

describe('ChefBrowseComponent', () => {
  let component: ChefBrowseComponent;
  let fixture: ComponentFixture<ChefBrowseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChefBrowseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChefBrowseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
