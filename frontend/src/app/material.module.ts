import { NgModule } from '@angular/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
	MAT_DATE_FORMATS,
	MAT_DATE_LOCALE,
	MatRippleModule,
	ShowOnDirtyErrorStateMatcher,
	ErrorStateMatcher,
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
	MAT_DIALOG_DEFAULT_OPTIONS,
	MatDialogModule,
} from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import {
	MAT_FORM_FIELD_DEFAULT_OPTIONS,
	MatFormFieldModule,
} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import {
	MatPaginatorIntl,
	MatPaginatorModule,
} from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {
	MAT_SNACK_BAR_DEFAULT_OPTIONS,
	MatSnackBarModule,
} from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { getPtBrPaginatorIntl } from './utils/pt-br-paginator-intl';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatStepperModule } from '@angular/material/stepper';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { NgxMaskModule } from 'ngx-mask';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';

const materialComponents = [
	MatProgressSpinnerModule,
	MatProgressBarModule,
	MatCheckboxModule,
	MatDatepickerModule,
	MatMomentDateModule,
	MatButtonModule,
	MatIconModule,
	MatFormFieldModule,
	MatInputModule,
	MatSelectModule,
	MatTableModule,
	MatSortModule,
	MatPaginatorModule,
	MatMenuModule,
	MatFormFieldModule,
	MatIconModule,
	MatInputModule,
	MatSidenavModule,
	MatRadioModule,
	MatButtonToggleModule,
	MatTooltipModule,
	MatToolbarModule,
	MatSlideToggleModule,
	MatDialogModule,
	MatSnackBarModule,
	MatToolbarModule,
	MatButtonModule,
	MatSidenavModule,
	MatIconModule,
	MatListModule,
	MatExpansionModule,
	MatRippleModule,
	MatCardModule,
	MatTabsModule,
	NgxMatSelectSearchModule,
	MatBottomSheetModule,
	ClipboardModule,
	MatStepperModule,
	MatBadgeModule,
	MatChipsModule,
	NgxMaskModule.forRoot(),
	NgxMatFileInputModule
];

@NgModule({
	declarations: [],
	imports: [materialComponents],
	exports: [materialComponents],
	providers: [
		{ provide: MatPaginatorIntl, useValue: getPtBrPaginatorIntl() },
		{
			provide: MAT_DIALOG_DEFAULT_OPTIONS,
			useValue: {
				disableClose: true,
				hasBackdrop: true,
				autoFocus: true,
				panelClass: 'padding-dialog',
			},
		},
		{
			provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
			useValue: { appearance: 'outline' },
		},
		{ provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 5000 } },
		{ provide: MAT_DATE_LOCALE, useValue: 'pt-br' },
		{ provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
		{
			provide: MAT_DATE_FORMATS,
			useValue: {
				parse: {
					dateInput: ['L'],
				},
				display: {
					dateInput: 'L',
					monthYearLabel: 'MMM YYYY',
					dateA11yLabel: 'LL',
					monthYearA11yLabel: 'MMMM YYYY',
				},
			},
		},
	],
})
export class MaterialModule {}
