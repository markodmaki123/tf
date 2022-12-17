import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatecommunityComponent } from './updatecommunity.component';

describe('UpdatecommunityComponent', () => {
  let component: UpdatecommunityComponent;
  let fixture: ComponentFixture<UpdatecommunityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatecommunityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatecommunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
