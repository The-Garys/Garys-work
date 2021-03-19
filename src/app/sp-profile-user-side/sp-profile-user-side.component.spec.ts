import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpProfileUserSideComponent } from './sp-profile-user-side.component';

describe('SpProfileUserSideComponent', () => {
  let component: SpProfileUserSideComponent;
  let fixture: ComponentFixture<SpProfileUserSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpProfileUserSideComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpProfileUserSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
