import { ConfirmarPedidoPage } from "./../confirmar-pedido/confirmar-pedido";
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as firebase from "firebase";
import { HomePage } from "../home/home";

@IonicPage()
@Component({
  selector: 'page-ultimo-pedido',
  templateUrl: 'ultimo-pedido.html',
})
export class UltimoPedidoPage {

  userUid;
  myForm: FormGroup;
  articulos = [];
  numeroPedido;
    
  palets1: number;
  palets2: number;
  palets3: number;
  palets4: number;
  palets5: number;
  palets6: number;
  palets7: number;
  palets8: number;
  palets9: number;
  palets10: number;
  palets11: number;
  palets12: number;

  prueba: number = 2;
  totalPrueba: number;
  fomare1: number;
  fomare2: number;

  cont; // la uso para el contador

  numeroArticulosHTML = 3;

  public totalPalets: number;
  textArea: string;

  public productos: Array<any>;
  public direcciones: Array<any>;  
  public currentUser: string = "";

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController) {
      this.userUid = this.navParams.get("uid"); 
      this.myForm = this.createMyForm();
      this.productos = [];    
      //this.totalPalets = 0;
      this.textArea = " ";
      
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

  saveData() {
    if (
      (this.palets2 >= 1 && this.myForm.value.articulo2 == null) ||
      (this.palets3 >= 1 && this.myForm.value.articulo3 == null) ||
      (this.palets4 >= 1 && this.myForm.value.articulo4 == null) ||
      (this.palets5 >= 1 && this.myForm.value.articulo5 == null) ||
      (this.palets6 >= 1 && this.myForm.value.articulo6 == null) ||
      (this.palets7 >= 1 && this.myForm.value.articulo7 == null) ||
      (this.palets8 >= 1 && this.myForm.value.articulo8 == null) ||
      (this.palets9 >= 1 && this.myForm.value.articulo9 == null) ||
      (this.palets10 >= 1 && this.myForm.value.articulo10 == null) ||
      (this.palets11 >= 1 && this.myForm.value.articulo11 == null) ||
      (this.palets12 >= 1 && this.myForm.value.articulo12 == null)
    ) {
      let alert = this.alertCtrl.create({
        title: "Faltan datos",
        subTitle: "Ha dejado un artículo sin indicar",
        buttons: ["OK"]
      });
      alert.present();      
      return;
    }

    console.log

    if (
      ((this.palets2 == null || this.palets2 == 0 ) && this.myForm.value.articulo2 != null) ||
      ((this.palets3 == null || this.palets3 == 0 ) && this.myForm.value.articulo3 != null) ||
      ((this.palets4 == null || this.palets4 == 0 ) && this.myForm.value.articulo4 != null) ||
      ((this.palets5 == null || this.palets5 == 0 ) && this.myForm.value.articulo5 != null) ||
      ((this.palets6 == null || this.palets6 == 0 ) && this.myForm.value.articulo6 != null) ||
      ((this.palets7 == null || this.palets7 == 0 ) && this.myForm.value.articulo7 != null) ||
      ((this.palets8 == null || this.palets8 == 0 ) && this.myForm.value.articulo8 != null) ||
      ((this.palets9 == null || this.palets9 == 0 ) && this.myForm.value.articulo9 != null) ||
      ((this.palets10 == null || this.palets10 == 0 ) && this.myForm.value.articulo10 != null) ||
      ((this.palets11 == null || this.palets11 == 0 ) && this.myForm.value.articulo11 != null) ||
      ((this.palets12 == null || this.palets12 == 0 ) && this.myForm.value.articulo12 != null)
    ) {
      let alert2 = this.alertCtrl.create({
        title: "Faltan datos",
        subTitle: "No ha indicado cantidad para un artículo seleccionado",
        buttons: ["OK"]
      });
      alert2.present();     
      return;
    }

    let confirm = this.alertCtrl.create({
      title: "¿Aceptar Pedido?",
      message: "¿Está seguro de aceptar el pedido?",
      buttons: [
        {
          text: "Cancelar",
          handler: () => {}
        },
        {
          text: "Ok",
          handler: () => {          
            let totalPalets = this.totalPalets;
            let formulario = this.myForm.value;
            let formularioFiltrado = [];
            let articulosFiltrados = [];
            let paletsFiltrados = [];            
            formularioFiltrado.push({'articulo':formulario.articulo1,'palets':formulario.palets1});            

            if(formulario.articulo2 != null && formulario.palets2 !=0){              
              formularioFiltrado.push({'articulo':formulario.articulo2,'palets':formulario.palets2});              
            }
            if(formulario.articulo3 != null && formulario.palets3 !=0){
              formularioFiltrado.push({'articulo':formulario.articulo3,'palets':formulario.palets3});              
            }
            if(formulario.articulo4 != null && formulario.palets4 !=0){
              formularioFiltrado.push({'articulo':formulario.articulo4,'palets':formulario.palets4});              
            }
            if(formulario.articulo5 != null && formulario.palets5 !=0){
              formularioFiltrado.push({'articulo':formulario.articulo5,'palets':formulario.palets5});              
            }
            if(formulario.articulo6 != null && formulario.palets6 !=0){
              formularioFiltrado.push({'articulo':formulario.articulo6,'palets':formulario.palets6});              
            }
            if(formulario.articulo7 != null && formulario.palets7 !=0){
              formularioFiltrado.push({'articulo':formulario.articulo7,'palets':formulario.palets7});              
            }
            if(formulario.articulo8 != null && formulario.palets8 !=0){
              formularioFiltrado.push({'articulo':formulario.articulo8,'palets':formulario.palets8});             
            }
            if(formulario.articulo9 != null && formulario.palets9 !=0){
              formularioFiltrado.push({'articulo':formulario.articulo9,'palets':formulario.palets9});              
            }
            if(formulario.articulo10 != null && formulario.palets10 !=0){
              formularioFiltrado.push({'articulo':formulario.articulo10,'palets':formulario.palets10});              
            }
            if(formulario.articulo11 != null && formulario.palets11 !=0){
              formularioFiltrado.push({'articulo':formulario.articulo11,'palets':formulario.palets11});              
            }
            if(formulario.articulo12 != null && formulario.palets12 !=0){
              formularioFiltrado.push({'articulo':formulario.articulo12,'palets':formulario.palets12});              
            }
           
            let horaPrevista;
            let horaFormulario = formulario.horaEntrega;

            if(horaFormulario == "manana1"){
              horaPrevista = 'Por la mañana a 1ª hora';
            }
            if(horaFormulario == "manana2"){
              horaPrevista = 'Por la mañana a 2ª hora';
            }
            if(horaFormulario == "tarde1"){
              horaPrevista = 'Por la tarde 1ª hora';
            }
            if(horaFormulario == "tarde2"){
              horaPrevista = 'Por la tarde 2ª hora';
            }
            if(horaFormulario == "siguienteManana"){
              horaPrevista = 'Al día siguiente por la mañana';
            }
            if(horaFormulario == "siguienteTarde"){
              horaPrevista = 'Al día siguiente por la tarde';
            }

            var observ:string = "";
            if(formulario.textArea == null){
              observ = " ";
            }else{
              observ = formulario.textArea;
            }

            

            this.navCtrl.push(ConfirmarPedidoPage, {              
              totalPalets: totalPalets,
              datosPedido: formularioFiltrado,
              horaPrevista: horaPrevista,
              direccion: formulario.direccion,
              observaciones: observ,             
              atendido: false,
              usuario: this.currentUser              
            });
          }
        }
      ]
    });
    confirm.present();
  }

  mostrarArticulo() {
    if (this.numeroArticulosHTML >= 12) {
      return false;
    } else {
      this.numeroArticulosHTML++;
    }
  }

  private createMyForm() {
    return this.formBuilder.group({
      horaEntrega: ["", Validators.required],
      articulo1: ["", Validators.required],
      articulo2: [],
      articulo3: [],
      articulo4: [],
      articulo5: [],
      articulo6: [],
      articulo7: [],
      articulo8: [],
      articulo9: [],
      articulo10: [],
      articulo11: [],
      articulo12: [],
      palets1: ["", Validators.required],
      palets2: [],
      palets3: [],
      palets4: [],
      palets5: [],
      palets6: [],
      palets7: [],
      palets8: [],
      palets9: [],
      palets10: [],
      palets11: [],
      palets12: [],
      direccion: ["", Validators.required],
      textArea: []
    });
  }

  sumar1(valor) {    
    const valorInt1 = parseInt(valor);
    if (isNaN(valorInt1)) {
      this.palets1 = 0;
    } else {
      this.palets1 = valorInt1;
    }
    this.sumar();
  }

  sumar2(valor) {
    const valorInt2 = parseInt(valor);
    if (isNaN(valorInt2)) {
      this.palets2 = 0;
    } else {
      this.palets2 = valorInt2;
    }
    this.sumar();
  }

  sumar3(valor) {
    const valorInt3 = parseInt(valor);
    if (isNaN(valorInt3)) {
      this.palets3 = 0;
    } else {
      this.palets3 = valorInt3;
    }
    this.sumar();
  }

  sumar4(valor) {
    const valorInt = parseInt(valor);
    if (isNaN(valorInt)) {
      this.palets4 = 0;
    } else {
      this.palets4 = valorInt;
    }
    this.sumar();
  }

  sumar5(valor) {
    const valorInt = parseInt(valor);
    if (isNaN(valorInt)) {
      this.palets5 = 0;
    } else {
      this.palets5 = valorInt;
    }
    this.sumar();
  }

  sumar6(valor) {
    const valorInt = parseInt(valor);
    if (isNaN(valorInt)) {
      this.palets6 = 0;
    } else {
      this.palets6 = valorInt;
    }
    this.sumar();
  }

  sumar7(valor) {
    const valorInt = parseInt(valor);
    if (isNaN(valorInt)) {
      this.palets7 = 0;
    } else {
      this.palets7 = valorInt;
    }
    this.sumar();
  }

  sumar8(valor) {
    const valorInt = parseInt(valor);
    if (isNaN(valorInt)) {
      this.palets8 = 0;
    } else {
      this.palets8 = valorInt;
    }
    this.sumar();
  }

  sumar9(valor) {
    const valorInt = parseInt(valor);
    if (isNaN(valorInt)) {
      this.palets9 = 0;
    } else {
      this.palets9 = valorInt;
    }
    this.sumar();
  }

  sumar10(valor) {
    const valorInt = parseInt(valor);
    if (isNaN(valorInt)) {
      this.palets10 = 0;
    } else {
      this.palets10 = valorInt;
    }
    this.sumar();
  }

  sumar11(valor) {
    const valorInt = parseInt(valor);
    if (isNaN(valorInt)) {
      this.palets11 = 0;
    } else {
      this.palets11 = valorInt;
    }
    this.sumar();
  }

  sumar12(valor) {
    const valorInt = parseInt(valor);
    if (isNaN(valorInt)) {
      this.palets12 = 0;
    } else {
      this.palets12 = valorInt;
    }
    this.sumar();
  }

  sumar() {
    if (isNaN(this.palets2)) {
      this.palets2 = 0;
    }
    if (isNaN(this.palets3)) {
      this.palets3 = 0;
    }
    if (isNaN(this.palets4)) {
      this.palets4 = 0;
    }
    if (isNaN(this.palets5)) {
      this.palets5 = 0;
    }
    if (isNaN(this.palets6)) {
      this.palets6 = 0;
    }
    if (isNaN(this.palets7)) {
      this.palets7 = 0;
    }
    if (isNaN(this.palets8)) {
      this.palets8 = 0;
    }
    if (isNaN(this.palets9)) {
      this.palets9 = 0;
    }
    if (isNaN(this.palets10)) {
      this.palets10 = 0;
    }
    if (isNaN(this.palets11)) {
      this.palets11 = 0;
    }
    if (isNaN(this.palets12)) {
      this.palets12 = 0;
    }
    
    this.totalPalets =
      this.palets1 +
      this.palets2 +
      this.palets3 +
      this.palets4 +
      this.palets5 +
      this.palets6 +
      this.palets7 +
      this.palets8 + //aquí totalPalets pasa a valer NaN
      this.palets9 +
      this.palets10 +
      this.palets11 +
      this.palets12;
  }  

  obtenerNumeroPedido(){

    return new Promise(resolve => {
      const dbNumeroPedido = firebase.database().
      ref("pedidosEmail")
      .on('value', eventListSnapshot => {      
      console.log("Numero de pedidos: "+eventListSnapshot.numChildren());
      this.numeroPedido = eventListSnapshot.numChildren()+1;
    });
      resolve(true);
    });
  }

  /*
  sumarContador(){
    const counterRef = firebase.database().ref("/counter");
    const q = counterRef.orderByChild("count");
    q.on("value", snap => {

      var contador = snap.val().count;
      console.log('Contador vale: '+contador);
      var nuevoCount = contador +1;
      var updates = {};
      var postData = {
        count: nuevoCount
      };

      updates["/counter/"] = {count:nuevoCount};
      
      return firebase
        .database()
        .ref()
        .update(updates);
    });
  }
  */

  obtenerProductos() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const db = firebase
          .database()
          .ref(`/userProfile/${user.uid}/productos`)
          .on("value", eventListSnapshot => {
            this.productos = [];
            eventListSnapshot.forEach(snap => {
              this.productos.push({
                id: snap.key,
                prod: snap.val().prod
              });
              return false;
            });
          });
      }
    });
  }

  obtenerDirecciones() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.currentUser = user.uid;
        const db2 = firebase
          .database()
          .ref(`/userProfile/${user.uid}/direccion`)
          .on("value", eventListSnapshot => {
            this.direcciones = [];
            eventListSnapshot.forEach(snap => {
              this.direcciones.push({
                id: snap.key,
                dir: snap.val().dir
              });
              return false;
            });
          });
      }
    });
  }

  obtenerKeyUltimoPedido(){
    
    const ref = firebase.database().ref(`/userProfile/${this.userUid}/pedidos`);
    
    const query = ref.orderByKey().limitToLast(1);
    query.on('child_added', snap => { 
      
      console.log('Observaciones: '+snap.val().observaciones);
      
      
      var lastKey = snap.key;
     
      this.totalPalets = snap.val().totalPalets;

      let hora = snap.val().horaPrevista;
      var horaParaFormulario = ""

      if(hora == "Por la mañana a 1ª hora"){
        horaParaFormulario = 'manana1';
      }
      if(hora == "Por la mañana a 2ª hora"){
        horaParaFormulario = 'manana2';
      }
      if(hora == "Por la tarde 1ª hora"){
        horaParaFormulario = 'tarde1';
      }
      if(hora == "Por la tarde 2ª hora"){
        horaParaFormulario = 'tarde2';
      }
      if(hora == "Al día siguiente por la mañana"){
        horaParaFormulario = 'siguienteManana';
      }
      if(hora == "Al día siguiente por la tarde"){
        horaParaFormulario = 'siguienteTarde';
      }

      var art2, art3, art4, art5, art6, art7, art8, art9, art10, art11, art12;
      var pal2, pal3, pal4, pal5, pal6, pal7, pal8, pal9, pal10, pal11, pal12;

      var numeroArticulos = snap.val().datosPedido.length;
      this.numeroArticulosHTML = numeroArticulos;

      var art1 = snap.val().datosPedido[0].articulo;
      var pal1 = parseInt(snap.val().datosPedido[0].palets);
      

      if(numeroArticulos == 1){        

        art2 = art3 = art4 = art5 = art6 = art7 = art8 = art9 = art10 = art11 = art12 = null;
        pal2 = pal3 = pal4 = pal5 = pal6 = pal7 = pal8 = pal9 = pal10 = pal11 = pal12 = null;
      }

      if(numeroArticulos == 2){
        art2 = snap.val().datosPedido[1].articulo;
        //pal2 = parseInt(snap.val().datosPedido[1].palets);
        pal2 = parseInt(snap.val().datosPedido[1].palets);
        
        art3 = art4 = art5 = art6 = art7 = art8 = art9 = art10 = art11 = art12 = null;
        pal3 = pal4 = pal5 = pal6 = pal7 = pal8 = pal9 = pal10 = pal11 = pal12 = null;
      }

      if(numeroArticulos == 3){
        art2 = snap.val().datosPedido[1].articulo;
        pal2 = parseInt(snap.val().datosPedido[1].palets);

        art3 = snap.val().datosPedido[2].articulo;
        pal3 = parseInt(snap.val().datosPedido[2].palets);
        

        art4 = art5 = art6 = art7 = art8 = art9 = art10 = art11 = art12 = null;
        pal4 = pal5 = pal6 = pal7 = pal8 = pal9 = pal10 = pal11 = pal12 = null;
      }

      if(numeroArticulos == 4){
        art2 = snap.val().datosPedido[1].articulo;
        pal2 = (snap.val().datosPedido[1].palets);

        art3 = snap.val().datosPedido[2].articulo;
        pal3 = (snap.val().datosPedido[2].palets);

        art4 = snap.val().datosPedido[3].articulo;
        pal4 = (snap.val().datosPedido[3].palets);

        art5 = art6 = art7 = art8 = art9 = art10 = art11 = art12 = null;
        pal5 = pal6 = pal7 = pal8 = pal9 = pal10 = pal11 = pal12 = null;
      }

      if(numeroArticulos == 5){
        art2 = snap.val().datosPedido[1].articulo;
        //pal2 = parseInt(snap.val().datosPedido[1].palets);
        pal2 = snap.val().datosPedido[1].palets;

        art3 = snap.val().datosPedido[2].articulo;
        pal3 = snap.val().datosPedido[2].palets;

        art4 = snap.val().datosPedido[3].articulo;
        pal4 = snap.val().datosPedido[3].palets;

        art5 = snap.val().datosPedido[4].articulo;
        pal5 = snap.val().datosPedido[4].palets;

        art6 = art7 = art8 = art9 = art10 = art11 = art12 = null;
        pal6 = pal7 = pal8 = pal9 = pal10 = pal11 = pal12 = null;
      }

      if(numeroArticulos == 6){
        art2 = snap.val().datosPedido[1].articulo;
        pal2 = snap.val().datosPedido[1].palets;

        art3 = snap.val().datosPedido[2].articulo;
        pal3 = snap.val().datosPedido[2].palets;

        art4 = snap.val().datosPedido[3].articulo;
        pal4 = snap.val().datosPedido[3].palets;

        art5 = snap.val().datosPedido[4].articulo;
        pal5 = snap.val().datosPedido[4].palets;

        art6 = snap.val().datosPedido[5].articulo;
        pal6 = snap.val().datosPedido[5].palets;

        art7 = art8 = art9 = art10 = art11 = art12 = null;
        pal7 = pal8 = pal9 = pal10 = pal11 = pal12 = null;
      }

      if(numeroArticulos == 7){
        art2 = snap.val().datosPedido[1].articulo;
        pal2 = snap.val().datosPedido[1].palets;

        art3 = snap.val().datosPedido[2].articulo;
        pal3 = snap.val().datosPedido[2].palets;

        art4 = snap.val().datosPedido[3].articulo;
        pal4 = snap.val().datosPedido[3].palets;

        art5 = snap.val().datosPedido[4].articulo;
        pal5 = snap.val().datosPedido[4].palets;

        art6 = snap.val().datosPedido[5].articulo;
        pal6 = snap.val().datosPedido[5].palets;

        art7 = snap.val().datosPedido[6].articulo;
        pal7 = snap.val().datosPedido[6].palets;

        art8 = art9 = art10 = art11 = art12 = null;
        pal8 = pal9 = pal10 = pal11 = pal12 = null;
      }

      if(numeroArticulos == 8){
        art2 = snap.val().datosPedido[1].articulo;
        pal2 = snap.val().datosPedido[1].palets;

        art3 = snap.val().datosPedido[2].articulo;
        pal3 = snap.val().datosPedido[2].palets;

        art4 = snap.val().datosPedido[3].articulo;
        pal4 = snap.val().datosPedido[3].palets;

        art5 = snap.val().datosPedido[4].articulo;
        pal5 = snap.val().datosPedido[4].palets;

        art6 = snap.val().datosPedido[5].articulo;
        pal6 = snap.val().datosPedido[5].palets;

        art7 = snap.val().datosPedido[6].articulo;
        pal7 = snap.val().datosPedido[6].palets;

        art8 = snap.val().datosPedido[7].articulo;
        pal8 = snap.val().datosPedido[7].palets;

        art9 = art10 = art11 = art12 = null;
        pal9 = pal10 = pal11 = pal12 = null;
      }

      if(numeroArticulos == 9){
        art2 = snap.val().datosPedido[1].articulo;
        pal2 = snap.val().datosPedido[1].palets;

        art3 = snap.val().datosPedido[2].articulo;
        pal3 = snap.val().datosPedido[2].palets;

        art4 = snap.val().datosPedido[3].articulo;
        pal4 = snap.val().datosPedido[3].palets;

        art5 = snap.val().datosPedido[4].articulo;
        pal5 = snap.val().datosPedido[4].palets;

        art6 = snap.val().datosPedido[5].articulo;
        pal6 = snap.val().datosPedido[5].palets;

        art7 = snap.val().datosPedido[6].articulo;
        pal7 = snap.val().datosPedido[6].palets;

        art8 = snap.val().datosPedido[7].articulo;
        pal8 = snap.val().datosPedido[7].palets;

        art9 = snap.val().datosPedido[8].articulo;
        pal9 = snap.val().datosPedido[8].palets;

        art10 = art11 = art12 = null;
        pal10 = pal11 = pal12 = null;
      }

      if(numeroArticulos == 10){
        art2 = snap.val().datosPedido[1].articulo;
        pal2 = snap.val().datosPedido[1].palets;

        art3 = snap.val().datosPedido[2].articulo;
        pal3 = snap.val().datosPedido[2].palets;

        art4 = snap.val().datosPedido[3].articulo;
        pal4 = snap.val().datosPedido[3].palets;

        art5 = snap.val().datosPedido[4].articulo;
        pal5 = snap.val().datosPedido[4].palets;

        art6 = snap.val().datosPedido[5].articulo;
        pal6 = snap.val().datosPedido[5].palets;

        art7 = snap.val().datosPedido[6].articulo;
        pal7 = snap.val().datosPedido[6].palets;

        art8 = snap.val().datosPedido[7].articulo;
        pal8 = snap.val().datosPedido[7].palets;

        art9 = snap.val().datosPedido[8].articulo;
        pal9 = snap.val().datosPedido[8].palets;

        art10 = snap.val().datosPedido[9].articulo;
        pal10 = snap.val().datosPedido[9].palets;

        art11 = art12 = null;
        pal11 = pal12 = null;
      }

      if(numeroArticulos == 11){
        art2 = snap.val().datosPedido[1].articulo;
        pal2 = snap.val().datosPedido[1].palets;

        art3 = snap.val().datosPedido[2].articulo;
        pal3 = snap.val().datosPedido[2].palets;

        art4 = snap.val().datosPedido[3].articulo;
        pal4 = snap.val().datosPedido[3].palets;

        art5 = snap.val().datosPedido[4].articulo;
        pal5 = snap.val().datosPedido[4].palets;

        art6 = snap.val().datosPedido[5].articulo;
        pal6 = snap.val().datosPedido[5].palets;

        art7 = snap.val().datosPedido[6].articulo;
        pal7 = snap.val().datosPedido[6].palets;

        art8 = snap.val().datosPedido[7].articulo;
        pal8 = snap.val().datosPedido[7].palets;

        art9 = snap.val().datosPedido[8].articulo;
        pal9 = snap.val().datosPedido[8].palets;

        art10 = snap.val().datosPedido[9].articulo;
        pal10 = snap.val().datosPedido[9].palets;

        art11 = snap.val().datosPedido[10].articulo;
        pal11 = snap.val().datosPedido[10].palets;

        art12 = null;
        pal12 = null;
      }

      if(numeroArticulos == 12){
        art2 = snap.val().datosPedido[1].articulo;
        pal2 = snap.val().datosPedido[1].palets;

        art3 = snap.val().datosPedido[2].articulo;
        pal3 = snap.val().datosPedido[2].palets;

        art4 = snap.val().datosPedido[3].articulo;
        pal4 = snap.val().datosPedido[3].palets;

        art5 = snap.val().datosPedido[4].articulo;
        pal5 = snap.val().datosPedido[4].palets;

        art6 = snap.val().datosPedido[5].articulo;
        pal6 = snap.val().datosPedido[5].palets;

        art7 = snap.val().datosPedido[6].articulo;
        pal7 = snap.val().datosPedido[6].palets;

        art8 = snap.val().datosPedido[7].articulo;
        pal8 = snap.val().datosPedido[7].palets;

        art9 = snap.val().datosPedido[8].articulo;
        pal9 = snap.val().datosPedido[8].palets;

        art10 = snap.val().datosPedido[9].articulo;
        pal10 = snap.val().datosPedido[9].palets;

        art11 = snap.val().datosPedido[10].articulo;
        pal11 = snap.val().datosPedido[10].palets;

        art12 = snap.val().datosPedido[11].articulo;
        pal12 = snap.val().datosPedido[11].palets;

        
      }  

      this.palets1 = pal1;
      this.palets2 = pal2;
      this.palets3 = pal3;

      this.palets4 = pal4;
      this.palets5 = pal5;
      this.palets6 = pal6;

      this.palets7 = pal7;
      this.palets8 = pal8;
      this.palets9 = pal9;

      this.palets10 = pal10;
      this.palets11 = pal11;
      this.palets12 = pal12;


      this.myForm.setValue({
       
        articulo1: art1,
        articulo2: art2,
        articulo3: art3,
        articulo4: art4,
        articulo5: art5,       
        articulo6: art6,
        articulo7: art7,
        articulo8: art8,
        articulo9: art9,
        articulo10: art10,
        articulo11: art11,
        articulo12: art12,
        palets1: this.palets1,
        palets2: this.palets2,
        palets3: this.palets3,
        palets4: this.palets4,
        palets5: this.palets5,
        palets6: this.palets6,
        palets7: this.palets7,
        palets8: this.palets8,
        palets9: this.palets9,
        palets10: this.palets10,
        palets11: this.palets11,
        palets12: this.palets12,       
        direccion:snap.val().direccion,        
        horaEntrega: horaParaFormulario,       
        textArea: snap.val().observaciones
        //textArea: "Prueba"

      });      
  });
}


ionViewDidLoad() {
  this.obtenerProductos();
  this.obtenerDirecciones();
  this.obtenerKeyUltimoPedido();  
  this.totalPrueba = this.palets1 + this.prueba;
  this.fomare1 = this.palets1 + this.palets2;
  this.fomare2 = this.palets1 + 1;
      console.log("Total Prueba"+this.totalPrueba);
      console.log("Fomare 1: "+this.fomare1);
      console.log("Fomare 2: "+this.fomare2);
}
  

}
