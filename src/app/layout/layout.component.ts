import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthService } from '../auth/service/auth.service';

@Component({
	selector: 'app-layout',
	templateUrl: './layout.component.html',
	styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {
	public mobileQuery: MediaQueryList;
	private _mobileQueryListener: () => void;
		
	constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private _authService: AuthService) {
		this.mobileQuery = media.matchMedia('(min-width: 600px)');
		this._mobileQueryListener = () => changeDetectorRef.detectChanges();
		this.mobileQuery.addListener(this._mobileQueryListener);
	}

	ngOnInit(): void {}

	ngOnDestroy(): void {
		this.mobileQuery.removeListener(this._mobileQueryListener);
	}

}
