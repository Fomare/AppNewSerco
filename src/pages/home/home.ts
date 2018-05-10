import { NavParams } from 'ionic-angular';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as firebase from "firebase";
import { Reference } from "@firebase/database-types";
import { User, AuthCredential } from "@firebase/auth-types";
import { UltimoPedidoPage } from '../ultimo-pedido/ultimo-pedido';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  userUid;
  
  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    this.obtenerUserUid();
  }

  goNuevoPedido():void {    
    this.navCtrl.push('PedidoPage');
  } 

  goUltimoPedido():void {    
    this.navCtrl.push(UltimoPedidoPage);
  } 

  obtenerUserUid(){
    firebase.auth().onAuthStateChanged(user => {
      if (user) {        
        this.userUid = user.uid;         
      }
      console.log('UserUid: '+this.userUid);
    });
  }

}
