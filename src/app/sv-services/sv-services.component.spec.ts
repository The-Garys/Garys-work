import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvServicesComponent } from './sv-services.component';

describe('SvServicesComponent', () => {
  let component: SvServicesComponent;
  let fixture: ComponentFixture<SvServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SvServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SvServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
