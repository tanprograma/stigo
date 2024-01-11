import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticReportDetailedComponent } from './statistic-report-detailed.component';

describe('StatisticReportDetailedComponent', () => {
  let component: StatisticReportDetailedComponent;
  let fixture: ComponentFixture<StatisticReportDetailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticReportDetailedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatisticReportDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
