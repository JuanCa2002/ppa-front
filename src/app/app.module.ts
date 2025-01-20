import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { RouterModule } from '@angular/router';
import localeEsHN from '@angular/common/locales/es-CO';
import { registerLocaleData } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService, SharedModule } from 'primeng/api';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FooterComponent } from './components/footer/footer.component';

registerLocaleData( localeEsHN );


/**
 * Modulo principal de la aplicacion, contiene
 * todos los componentes y modulos de inicio
 */
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    MenubarModule,
    HttpClientModule,
    ProgressSpinnerModule,
    SharedModule
  ],
  providers: [
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    }
  ],
  bootstrap: [ AppComponent ],
})
export class AppModule { }
