import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispenseFormComponent } from './dispense-form.component';

describe('DispenseFormComponent', () => {
  let component: DispenseFormComponent;
  let fixture: ComponentFixture<DispenseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DispenseFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DispenseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
