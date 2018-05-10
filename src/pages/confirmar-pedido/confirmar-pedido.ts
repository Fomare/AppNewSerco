import { HomePage } from "./../home/home";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import * as firebase from "firebase";
import { PedidoRealizadoPage } from "../pedido-realizado/pedido-realizado";

/**
 * Generated class for the ConfirmarPedidoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
  //articulos;
  //palets;
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
    //this.numeroPedido = this.navParams.get("numeroPedido");
    console.log("Lo que le llega al COnfirmar-Pedido"+this.numeroPedido);
  }

  obtenerNumeroPedido(){

    return new Promise(resolve => {
      const dbNumeroPedido = firebase.database().
      ref("pedidosEmail")
      .on('value', eventListSnapshot => {      
      console.log("Numero de pedidos: "+eventListSnapshot.numChildren());
      this.numeroPedido = eventListSnapshot.numChildren();
    });
      resolve(true);
    });
  }

  obtenerContador() {
    const counterRef = firebase.database().ref("/counter");
    const q = counterRef.orderByChild("count");
    q.on("value", snap => {
      var contador = snap.val().count;
      console.log("CONTADOR!!!: " + contador);
      //this.numeroPedido = contador + 1;
    });
  }

  obtenerContadorPromesa() {
    return new Promise(resolve => {
      const counterRef = firebase.database().ref("/counter");
      const q = counterRef.orderByChild("count");
      q.on("value", snap => {
        var contador = snap.val().count;
        console.log("CONTADOR!!!: " + contador);
        //this.numeroPedido = contador + 1;
      });
      resolve(true);
    });
  }


  confirmarPedido(){

    // const counterRef = firebase.database().ref("/counter");
    // const q = counterRef.orderByChild("count");

    // q.on("value", snap => {
    //   
    //   var contador = snap.val().count;
    //   // console.log("CONTADOR!!!: " + contador);
    //   this.numeroPedido = contador + 1;
    //   var updates = {};
    //   updates["/counter/"] = {count:this.numeroPedido};

    //   firebase
    //     .database()
    //     .ref()
    //     .update(updates);     
    
    // });
    
    
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
      //updates["/counter/"] = {count:contador+1};
      //updates[`/counter/count}`] = contador+1;
  
      this.navCtrl.setRoot(PedidoRealizadoPage);
  
      return firebase
        .database()
        .ref()
        .update(updates);
    
    
  }

  confirmarPedido2() {
    this.obtenerContadorPromesa().then( p => {
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
        //numeroPedido: this.numeroPedido
      };
  
      var newPostKey = firebase
        .database()
        .ref()
        .child("pedidos")
        .push().key;
      var updates = {};
      updates["/pedidos/" + newPostKey] = postData;
      updates["/pedidosEmail/" + newPostKey] = postData;
  
      //this.navCtrl.setRoot(HomePage);
  
      return firebase
        .database()
        .ref()
        .update(updates);

    });
    // let fechaPedido = new Date();
    // let dia = fechaPedido.getDate();
    // let mes = fechaPedido.getMonth() + 1;
    // let anyo = fechaPedido.getFullYear();
    // let hora = fechaPedido.getHours();
    // let minutos = fechaPedido.getMinutes();

    // var postData = {
    //   totalPalets: this.totalPalets,
    //   datosPedido: this.datosPedido,
    //   horaPrevista: this.horaPrevista,
    //   direccion: this.direccion,
    //   observaciones: this.observaciones,
    //   atendido: false,
    //   usuario: this.usuario,
    //   dia: dia,
    //   mes: mes,
    //   anyo: anyo,
    //   hora: hora,
    //   minutos: minutos,
    //   numeroPedido: this.numeroPedido
    // };

    // var newPostKey = firebase
    //   .database()
    //   .ref()
    //   .child("pedidos")
    //   .push().key;
    // var updates = {};
    // updates["/pedidos/" + newPostKey] = postData;
    // updates["/pedidosEmail/" + newPostKey] = postData;

    //this.navCtrl.setRoot(HomePage);

    // return firebase
    //   .database()
    //   .ref()
    //   .update(updates);

    /*
    firebase
      .database()
      .ref("pedidos/")
      .push({
        totalPalets: this.totalPalets,        
        datosPedido: this.datosPedido,
        horaPrevista : this.horaPrevista,
        direccion : this.direccion,
        observaciones : this.observaciones,
        atendido: false,
        usuario: this.usuario,
        dia:dia,
        mes:mes,
        anyo:anyo,
        hora:hora,
        minutos:minutos
      })
      .then(p => {
        // const counterRef = firebase.database().ref('/counter');
        // counterRef.transaction(function (post){
        //   post.count++;
        // });
        
        this.navCtrl.setRoot(HomePage);
      });
      */
  }

  ionViewDidLoad() {
    this.obtenerNumeroPedido();
  }
}
