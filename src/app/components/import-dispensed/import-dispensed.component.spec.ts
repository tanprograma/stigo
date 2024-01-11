import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportDispensedComponent } from './import-dispensed.component';

describe('ImportDispensedComponent', () => {
  let component: ImportDispensedComponent;
  let fixture: ComponentFixture<ImportDispensedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportDispensedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportDispensedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
