import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { RouterModule } from '@angular/router';
import localeEsHN from '@angular/common/locales/es-CO';
import { registerLocaleData } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

registerLocaleData( localeEsHN );


/**
 * Modulo principal de la aplicacion, contiene
 * todos los componentes y modulos de inicio
 */
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    MenubarModule,
    HttpClientModule
  ],
  providers: [
    MessageService
  ],
  bootstrap: [ AppComponent ],
})
export class AppModule { }
