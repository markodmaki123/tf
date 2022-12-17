import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RulescardComponent } from './rulescard.component';

describe('RulescardComponent', () => {
  let component: RulescardComponent;
  let fixture: ComponentFixture<RulescardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RulescardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RulescardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
