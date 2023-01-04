import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import {AuthService} from './service/auth.service';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthTokenInterceptor } from './interceptor/auth.token.interceptor';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { ErrorsComponent } from './errors/errors.component';
import { ComponentsModule } from './errors/component.module';






@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,  HttpClientModule,ComponentsModule],
  providers: [ HttpClient,Storage, AuthService,ErrorsComponent,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },{
  provide: HTTP_INTERCEPTORS,
     useClass: AuthTokenInterceptor,
    multi: true,
 }
],
  bootstrap: [AppComponent],
  
})
export class AppModule {}
