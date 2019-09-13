import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNApplyJobsComponent } from './view-n-apply-jobs.component';

describe('ViewNApplyJobsComponent', () => {
  let component: ViewNApplyJobsComponent;
  let fixture: ComponentFixture<ViewNApplyJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewNApplyJobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewNApplyJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
