//import { UltimoPedidoPage } from './../pages/ultimo-pedido/ultimo-pedido';
import { PedidoRealizadoPage } from './../pages/pedido-realizado/pedido-realizado';

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AuthProvider } from '../providers/auth/auth';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ConfirmarPedidoPage } from '../pages/confirmar-pedido/confirmar-pedido';

@NgModule({
  declarations: [
    MyApp,
    HomePage,PedidoRealizadoPage,ConfirmarPedidoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,PedidoRealizadoPage,ConfirmarPedidoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider
  ]
})
export class AppModule {}
