import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllJobsComponent } from './view-all-jobs.component';

describe('ViewAllJobsComponent', () => {
  let component: ViewAllJobsComponent;
  let fixture: ComponentFixture<ViewAllJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAllJobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
