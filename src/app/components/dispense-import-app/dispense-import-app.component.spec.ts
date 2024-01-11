import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispenseImportAppComponent } from './dispense-import-app.component';

describe('DispenseImportAppComponent', () => {
  let component: DispenseImportAppComponent;
  let fixture: ComponentFixture<DispenseImportAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DispenseImportAppComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DispenseImportAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
