import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-pedido-realizado',
  templateUrl: 'pedido-realizado.html',
})
export class PedidoRealizadoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PedidoRealizadoPage');
  }

  goInicio(){
    this.navCtrl.setRoot(HomePage);
  }

}
