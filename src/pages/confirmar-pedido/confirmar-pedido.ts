import { HomePage } from "./../home/home";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.totalPalets = this.navParams.get("totalPalets");
    this.datosPedido = this.navParams.get("datosPedido");
    this.horaPrevista = this.navParams.get("horaPrevista");
    this.direccion = this.navParams.get("direccion");
    this.observaciones = this.navParams.get("observaciones");
    this.atendido = this.navParams.get("atendido");
    this.usuario = this.navParams.get("usuario");
    
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
        atendido: false,
        usuario: this.usuario,
        dia: dia,
        mes: mes,
        anyo: anyo,
        hora: hora,
        minutos: minutos,
        numeroPedido: this.numeroPedido
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
