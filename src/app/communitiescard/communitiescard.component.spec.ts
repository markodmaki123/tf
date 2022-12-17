import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunitiescardComponent } from './communitiescard.component';

describe('CommunitiescardComponent', () => {
  let component: CommunitiescardComponent;
  let fixture: ComponentFixture<CommunitiescardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunitiescardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunitiescardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
