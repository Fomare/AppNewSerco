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
//import { Reference } from "@firebase/database-types";
//import { User } from "@firebase/auth-types";

@IonicPage()
@Component({
  selector: "page-pedido",
  templateUrl: "pedido.html"
})
export class PedidoPage {
  myForm: FormGroup;
  articulos = [];
  numeroPedido;
  //userUid;
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

  cont; // la uso para el contador
  userUid;

  email = "";
  empresa = "";

  numeroArticulos = 3;

  public totalPalets: number;
  textArea: string = "";

  public productos: Array<any>; // productos asociados a una empresa
  public direcciones: Array<any>;
  //public direc: Array<any>;
  //public userProfile: Reference;
  public currentUser: string = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController
  ) {
    this.userUid = this.navParams.get("uid");
    console.log("UID: " + this.userUid);
    this.myForm = this.createMyForm();
    this.productos = [];
    // this.obtenerProductos();
    // this.obtenerDirecciones();
    this.totalPalets = 0;
    //this.obtenerContador();
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

    if (
      (this.palets4 == 0 && this.myForm.value.articulo4 != null) ||
      (this.palets5 == 0 && this.myForm.value.articulo5 != null) ||
      (this.palets6 == 0 && this.myForm.value.articulo6 != null) ||
      (this.palets7 == 0 && this.myForm.value.articulo7 != null) ||
      (this.palets8 == 0 && this.myForm.value.articulo8 != null) ||
      (this.palets9 == 0 && this.myForm.value.articulo9 != null) ||
      (this.palets10 == 0 && this.myForm.value.articulo10 != null) ||
      (this.palets11 == 0 && this.myForm.value.articulo11 != null) ||
      (this.palets12 == 0 && this.myForm.value.articulo12 != null)
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
            //formularioFiltrado.push({'articulo1':formulario.articulo1},{'palets1':formulario.palets1});
            formularioFiltrado.push({
              articulo: formulario.articulo1,
              palets: formulario.palets1
            });
            // articulosFiltrados.push({'art':formulario.articulo1});
            // paletsFiltrados.push({'palet':formulario.palets1});

            if (formulario.articulo2 != null && formulario.palets2 != 0) {
              //formularioFiltrado.push({'articulo2':formulario.articulo2},{'palets2':formulario.palets2});
              formularioFiltrado.push({
                articulo: formulario.articulo2,
                palets: formulario.palets2
              });
              // articulosFiltrados.push({'art':formulario.articulo2});
              // paletsFiltrados.push({'palet':formulario.palets2});
            }
            if (formulario.articulo3 != null && formulario.palets3 != 0) {
              formularioFiltrado.push({
                articulo: formulario.articulo3,
                palets: formulario.palets3
              });
              // articulosFiltrados.push({'art':formulario.articulo3});
              // paletsFiltrados.push({'palet':formulario.palets3});
            }
            if (formulario.articulo4 != null && formulario.palets4 != 0) {
              formularioFiltrado.push({
                articulo: formulario.articulo4,
                palets: formulario.palets4
              });
              // articulosFiltrados.push({'art':formulario.articulo4});
              // paletsFiltrados.push({'palet':formulario.palets4});
            }
            if (formulario.articulo5 != null && formulario.palets5 != 0) {
              formularioFiltrado.push({
                articulo: formulario.articulo5,
                palets: formulario.palets5
              });
              // articulosFiltrados.push({'art':formulario.articulo5});
              // paletsFiltrados.push({'palet':formulario.palets5});
            }
            if (formulario.articulo6 != null && formulario.palets6 != 0) {
              formularioFiltrado.push({
                articulo: formulario.articulo6,
                palets: formulario.palets6
              });
              // articulosFiltrados.push({'art':formulario.articulo6});
              // paletsFiltrados.push({'palet':formulario.palets6});
            }
            if (formulario.articulo7 != null && formulario.palets7 != 0) {
              formularioFiltrado.push({
                articulo: formulario.articulo7,
                palets: formulario.palets7
              });
              // articulosFiltrados.push({'art':formulario.articulo7});
              // paletsFiltrados.push({'palet':formulario.palets7});
            }
            if (formulario.articulo8 != null && formulario.palets8 != 0) {
              formularioFiltrado.push({
                articulo: formulario.articulo8,
                palets: formulario.palets8
              });
              // articulosFiltrados.push({'art':formulario.articulo8});
              // paletsFiltrados.push({'palet':formulario.palets8});
            }
            if (formulario.articulo9 != null && formulario.palets9 != 0) {
              formularioFiltrado.push({
                articulo: formulario.articulo9,
                palets: formulario.palets9
              });
              // articulosFiltrados.push({'art':formulario.articulo9});
              // paletsFiltrados.push({'palet':formulario.palets9});
            }
            if (formulario.articulo10 != null && formulario.palets10 != 0) {
              formularioFiltrado.push({
                articulo: formulario.articulo10,
                palets: formulario.palets10
              });
              // articulosFiltrados.push({'art':formulario.articulo10});
              // paletsFiltrados.push({'palet':formulario.palets10});
            }
            if (formulario.articulo11 != null && formulario.palets11 != 0) {
              formularioFiltrado.push({
                articulo: formulario.articulo11,
                palets: formulario.palets11
              });
              // articulosFiltrados.push({'art':formulario.articulo11});
              // paletsFiltrados.push({'palet':formulario.palets11});
            }
            if (formulario.articulo12 != null && formulario.palets12 != 0) {
              formularioFiltrado.push({
                articulo: formulario.articulo12,
                palets: formulario.palets12
              });
              // articulosFiltrados.push({'art':formulario.articulo12});
              // paletsFiltrados.push({'palet':formulario.palets12});
            }
            //console.log('FOMARE!!! FILTRADO: '+formularioFiltrado);

            let horaPrevista;
            let horaFormulario = formulario.horaEntrega;

            if (horaFormulario == "manana1") {
              horaPrevista = "Por la mañana a 1ª hora";
            }
            if (horaFormulario == "manana2") {
              horaPrevista = "Por la mañana a 2ª hora";
            }
            if (horaFormulario == "tarde1") {
              horaPrevista = "Por la tarde 1ª hora";
            }
            if (horaFormulario == "tarde2") {
              horaPrevista = "Por la tarde 2ª hora";
            }
            if (horaFormulario == "siguienteManana") {
              horaPrevista = "Al día siguiente por la mañana";
            }
            if (horaFormulario == "siguienteTarde") {
              horaPrevista = "Al día siguiente por la tarde";
            }

            // si observaciones va vacío, le da el valor de cadena vacía
            var observ:string = "";
            console.log('Text Area: '+formulario.textArea);
            if(formulario.textArea == null ){
              observ = " ";
            }
            else{
              observ = formulario.textArea;
            }

            this.navCtrl.push(ConfirmarPedidoPage, {
              totalPalets: totalPalets,
              datosPedido: formularioFiltrado,
              horaPrevista: horaPrevista,
              direccion: formulario.direccion,
              observaciones: observ,
              atendido: "NO",
              usuario: this.currentUser,
              email: this.email,
              empresa: this.empresa
              //empresa:
            });
          }
        }
      ]
    });
    confirm.present();
  }

  mostrarArticulo() {
    if (this.numeroArticulos >= 12) {
      return false;
    } else {
      this.numeroArticulos++;
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
    //var valorInt = parseInt(valor);
    var valorInt = parseInt(valor);
    if (isNaN(valorInt)) {
      this.palets1 = 0;
    } else {
      this.palets1 = valorInt;
    }
    this.sumar();
  }

  sumar2(valor) {
    var valorInt = parseInt(valor);
    if (isNaN(valorInt)) {
      this.palets2 = 0;
    } else {
      this.palets2 = valorInt;
    }
    this.sumar();
  }

  sumar3(valor) {
    var valorInt = parseInt(valor);
    if (isNaN(valorInt)) {
      this.palets3 = 0;
    } else {
      this.palets3 = valorInt;
    }
    this.sumar();
  }

  sumar4(valor) {
    var valorInt = parseInt(valor);
    if (isNaN(valorInt)) {
      this.palets4 = 0;
    } else {
      this.palets4 = valorInt;
    }
    this.sumar();
  }

  sumar5(valor) {
    var valorInt = parseInt(valor);
    if (isNaN(valorInt)) {
      this.palets5 = 0;
    } else {
      this.palets5 = valorInt;
    }
    this.sumar();
  }

  sumar6(valor) {
    var valorInt = parseInt(valor);
    if (isNaN(valorInt)) {
      this.palets6 = 0;
    } else {
      this.palets6 = valorInt;
    }
    this.sumar();
  }

  sumar7(valor) {
    var valorInt = parseInt(valor);
    if (isNaN(valorInt)) {
      this.palets7 = 0;
    } else {
      this.palets7 = valorInt;
    }
    this.sumar();
  }

  sumar8(valor) {
    var valorInt = parseInt(valor);
    if (isNaN(valorInt)) {
      this.palets8 = 0;
    } else {
      this.palets8 = valorInt;
    }
    this.sumar();
  }

  sumar9(valor) {
    var valorInt = parseInt(valor);
    if (isNaN(valorInt)) {
      this.palets9 = 0;
    } else {
      this.palets9 = valorInt;
    }
    this.sumar();
  }

  sumar10(valor) {
    var valorInt = parseInt(valor);
    if (isNaN(valorInt)) {
      this.palets10 = 0;
    } else {
      this.palets10 = valorInt;
    }
    this.sumar();
  }

  sumar11(valor) {
    var valorInt = parseInt(valor);
    if (isNaN(valorInt)) {
      this.palets11 = 0;
    } else {
      this.palets11 = valorInt;
    }
    this.sumar();
  }

  sumar12(valor) {
    var valorInt = parseInt(valor);
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
      this.palets8 +
      this.palets9 +
      this.palets10 +
      this.palets11 +
      this.palets12;
  }

  obtenerNumeroPedido() {
    return new Promise(resolve => {
      const dbNumeroPedido = firebase
        .database()
        .ref("pedidosEmail")
        .on("value", eventListSnapshot => {
          console.log("Numero de pedidos: " + eventListSnapshot.numChildren());
          this.numeroPedido = eventListSnapshot.numChildren() + 1;
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
          .once("value", eventListSnapshot => {
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
          .once("value", eventListSnapshot => {
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

  obtenerEmailEmpresa() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.currentUser = user.uid;
        const db2 = firebase
          .database()
          .ref(`/userProfile/${user.uid}`)
          .once("value", snap => {
            this.email = snap.val().email;
            this.empresa = snap.val().empresa;
          });
      }
    });
  }

  ionViewDidLoad() {
    this.obtenerProductos();
    this.obtenerDirecciones();
    this.obtenerEmailEmpresa();
  }
}
