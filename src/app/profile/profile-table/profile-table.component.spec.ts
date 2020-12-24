import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProfileTableComponent } from './profile-table.component';

describe('ProfileTableComponent', () => {
  let component: ProfileTableComponent;
  let fixture: ComponentFixture<ProfileTableComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ProfileTableComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
