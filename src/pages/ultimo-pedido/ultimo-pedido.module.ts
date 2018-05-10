import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UltimoPedidoPage } from './ultimo-pedido';

@NgModule({
  declarations: [
    UltimoPedidoPage,
  ],
  imports: [
    IonicPageModule.forChild(UltimoPedidoPage),
  ],
})
export class UltimoPedidoPageModule {}
