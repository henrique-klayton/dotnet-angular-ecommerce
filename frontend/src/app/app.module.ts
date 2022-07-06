import { Injector, LOCALE_ID, NgModule } from '@angular/core';
import pt from '@angular/common/locales/pt';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './layout/layout.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { MaterialModule } from './material.module';
import { registerLocaleData } from '@angular/common';
import { AuthComponent } from './auth/auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppInjector } from './shared/service/injector.service';
import { AlertService } from './shared/service/alert.service';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthInterceptor } from './auth/auth.interceptor';

registerLocaleData(pt);

@NgModule({
	declarations: [
		AppComponent,
		LayoutComponent,
		FooterComponent,
		HeaderComponent,
		SidebarComponent,
		AuthComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		JwtModule.forRoot({
			config: {
				tokenGetter: () => localStorage.getItem('access_token'),
				allowedDomains: ['localhost:5000', 'localhost:5001']
			}
		}),
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		MaterialModule
	],
	providers: [
		HttpClient,
		AlertService,
		{ provide: LOCALE_ID, useValue: 'pt-BR' },
		{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
	],
	bootstrap: [AppComponent],
})
export class AppModule {
	constructor(private _injector: Injector) {
		AppInjector.injector = _injector;
	}
}
