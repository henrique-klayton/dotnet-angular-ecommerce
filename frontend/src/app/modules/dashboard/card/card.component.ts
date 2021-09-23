import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
	selector: 'app-dashboard-card',
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {

	@Input() title: string;
	@Input() icon: string;
	@Input() value: number;
	constructor() { }
}
