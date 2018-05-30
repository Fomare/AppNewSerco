import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import * as firebase from "firebase";

@IonicPage()
@Component({
  selector: 'page-pedido-realizado',
  templateUrl: 'pedido-realizado.html',
})
export class PedidoRealizadoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PedidoRealizadoPage');
  }

  goInicio(){
    this.navCtrl.setRoot(HomePage);
  }

  logout(): Promise<void> {
    const userId: string = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref(`/userProfile/${userId}`)
      .off();
    return firebase.auth().signOut();
  }

  salir() {
    let confirm = this.alertCtrl.create({
      title: "Cerrar sesión",
      message: "¿Estás seguro de que quieres cerrar la aplicación?",
      buttons: [
        {
          text: "No",
          handler: () => {
            return true;
          }
        },
        {
          text: "Sí",
          handler: () => {
            this.logout();
          }
        }
      ]
    });
    confirm.present();
  }

}
