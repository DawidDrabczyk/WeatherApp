import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouritePlacesComponent } from './favourite-places.component';

describe('FavouritePlacesComponent', () => {
  let component: FavouritePlacesComponent;
  let fixture: ComponentFixture<FavouritePlacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavouritePlacesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FavouritePlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
