import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldCameraComponent } from './world-camera.component';

describe('WorldCameraComponent', () => {
  let component: WorldCameraComponent;
  let fixture: ComponentFixture<WorldCameraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorldCameraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorldCameraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
