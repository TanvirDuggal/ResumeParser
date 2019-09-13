import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateApplicantProfileComponent } from './update-applicant-profile.component';

describe('UpdateApplicantProfileComponent', () => {
  let component: UpdateApplicantProfileComponent;
  let fixture: ComponentFixture<UpdateApplicantProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateApplicantProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateApplicantProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
