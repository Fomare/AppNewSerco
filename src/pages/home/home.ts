import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import * as firebase from "firebase";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  userUid;
  //tienePedido: boolean = false;
  habilitarUltimoPedido: boolean = false;
  
  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {}

  ionViewDidLoad() {
    // this.obtenerUserUid();
    
  }

  ionViewWillEnter(){
    this.obtenerUserUid();
  }

  // ionViewCanEnter(){
  //   this.obtenerUserUid();
  //   return true;
  // }

  tienePedidos(){

    return new Promise(resolve => {
      const dbTienePedidos = firebase.database().
      ref(`/userProfile/${this.userUid}`)
      .on('value', snap => {      
        if (!snap.hasChild("pedidos")) {
          console.log('NO TIENE PEDIDOS');
          this.habilitarUltimoPedido = true;
        }else {
          console.log('SIII TIENE PEDIDOS');
          this.habilitarUltimoPedido = false;
          //var numeroPedidos = snap.numChildren();
          //console.log('TIENE '+numeroPedidos+' pedidos');
        }
      //console.log("Numero de pedidos: "+snap.numChildren());
      //this.numeroPedido = snap.numChildren()+1;
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

  goNuevoPedido():void {    
    this.navCtrl.push('PedidoPage', {uid: this.userUid});
  } 

  goUltimoPedido():void {  
    //if(this.habilitarUltimoPedido){
      this.navCtrl.push('UltimoPedidoPage', {uid: this.userUid});
    //}  
    
  } 

  // obtenerUserUid(){
  //   firebase.auth().onAuthStateChanged(user => {
  //     if (user) {        
  //       this.userUid = user.uid;         
  //     }     
  //   });
  // }

  obtenerUserUid(){
    return new Promise(resolve =>{

      firebase.auth().onAuthStateChanged(user => {
        if (user) {        
          this.userUid = user.uid;  
          this.tienePedidos().then(s =>{
            console.log('Linea 82');
          });          
          
        } 

    });      
    resolve(true);
  });  
    
}

}
