import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartSalesComponent } from './chart-sales.component';

describe('ChartSalesComponent', () => {
	let component: ChartSalesComponent;
	let fixture: ComponentFixture<ChartSalesComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ ChartSalesComponent ]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ChartSalesComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
