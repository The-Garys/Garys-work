import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvNavComponent } from './sv-nav.component';

describe('SvNavComponent', () => {
  let component: SvNavComponent;
  let fixture: ComponentFixture<SvNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SvNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SvNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
