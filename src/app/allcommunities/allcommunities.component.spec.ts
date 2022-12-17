import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllcommunitiesComponent } from './allcommunities.component';

describe('AllcommunitiesComponent', () => {
  let component: AllcommunitiesComponent;
  let fixture: ComponentFixture<AllcommunitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllcommunitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllcommunitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
