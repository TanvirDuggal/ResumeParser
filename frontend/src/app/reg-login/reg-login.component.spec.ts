import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegLoginComponent } from './reg-login.component';

describe('RegLoginComponent', () => {
  let component: RegLoginComponent;
  let fixture: ComponentFixture<RegLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
