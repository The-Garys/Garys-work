import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceProviderCardComponent } from './service-provider-card.component';

describe('ServiceProviderCardComponent', () => {
  let component: ServiceProviderCardComponent;
  let fixture: ComponentFixture<ServiceProviderCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceProviderCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceProviderCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
