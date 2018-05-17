import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as firebase from "firebase";

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
    this.navCtrl.push('PedidoPage', {uid: this.userUid});
  } 

  goUltimoPedido():void {    
    this.navCtrl.push('UltimoPedidoPage', {uid: this.userUid});
  } 

  obtenerUserUid(){
    firebase.auth().onAuthStateChanged(user => {
      if (user) {        
        this.userUid = user.uid;         
      }     
    });
  }

}
