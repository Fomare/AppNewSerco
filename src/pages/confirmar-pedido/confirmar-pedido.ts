import { HomePage } from "./../home/home";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, AlertController } from "ionic-angular";
import * as firebase from "firebase";
import { PedidoRealizadoPage } from "../pedido-realizado/pedido-realizado";

@IonicPage()
@Component({
  selector: "page-confirmar-pedido",
  templateUrl: "confirmar-pedido.html"
})
export class ConfirmarPedidoPage {
  dia;
  mes;
  anyo;
  hora;
  minutos;
  totalPalets;
  
  atendido;
  usuario;
  datosPedido;
  horaPrevista;
  direccion;
  observaciones;
  numeroPedido;

  email;
  empresa;

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController) {
    this.totalPalets = this.navParams.get("totalPalets");
    this.datosPedido = this.navParams.get("datosPedido");
    this.horaPrevista = this.navParams.get("horaPrevista");
    this.direccion = this.navParams.get("direccion");
    this.observaciones = this.navParams.get("observaciones");
    this.atendido = this.navParams.get("atendido");
    this.usuario = this.navParams.get("usuario");
    this.email = this.navParams.get("email");
    this.empresa = this.navParams.get("empresa");
    
  }

  obtenerNumeroPedido(){

    return new Promise(resolve => {
      const dbNumeroPedido = firebase.database().
      ref("pedidosEmail")
      .on('value', eventListSnapshot => {      
      this.numeroPedido = eventListSnapshot.numChildren();
    });
      resolve(true);
    });
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

  confirmarPedido(){
   
    let fechaPedido = new Date();
      let dia = fechaPedido.getDate();
      let mes = fechaPedido.getMonth() + 1;
      let anyo = fechaPedido.getFullYear();
      let hora = fechaPedido.getHours();
      let minutos = fechaPedido.getMinutes();
  
      var postData = {
        totalPalets: this.totalPalets,
        datosPedido: this.datosPedido,
        horaPrevista: this.horaPrevista,
        direccion: this.direccion,
        observaciones: this.observaciones,
        atendido: 'NO',
        usuario: this.usuario,
        dia: dia,
        mes: mes,
        anyo: anyo,
        hora: hora,
        minutos: minutos,
        numeroPedido: this.numeroPedido,
        email: this.email,
        empresa: this.empresa
      };
  
      var newPostKey = firebase
        .database()
        .ref()
        .child("pedidos")
        .push().key;
      var updates = {};
      updates["/pedidos/" + newPostKey] = postData;
      updates["/pedidosEmail/" + newPostKey] = postData;
      updates[`/userProfile/${this.usuario}/pedidos/` + newPostKey] = postData;      
  
      this.navCtrl.setRoot(PedidoRealizadoPage);
  
      return firebase
        .database()
        .ref()
        .update(updates);
    
    
  }  

  ionViewDidLoad() {
    this.obtenerNumeroPedido();
  }
}
