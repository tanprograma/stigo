import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispenseAppComponent } from './dispense-app.component';

describe('DispenseAppComponent', () => {
  let component: DispenseAppComponent;
  let fixture: ComponentFixture<DispenseAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DispenseAppComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DispenseAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
