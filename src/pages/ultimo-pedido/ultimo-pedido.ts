import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the UltimoPedidoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ultimo-pedido',
  templateUrl: 'ultimo-pedido.html',
})
export class UltimoPedidoPage {

  userUid;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.userUid = this.navParams.get("uid");
    console.log('Ultimo pedido. UID: '+this.userUid);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UltimoPedidoPage');
  }

}
