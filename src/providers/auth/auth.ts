import { NavController } from 'ionic-angular';
//import { HomePage } from './../../pages/home/home';
import { Injectable } from '@angular/core';
import firebase from 'firebase';


@Injectable()
export class AuthProvider {

  constructor() {  
  }

  loginUser (email: string, password: string): Promise<any> {    
  
    return firebase.auth().signInWithEmailAndPassword(email, password);
            //.then(user => {

              //console.log("User: "+JSON.stringify(user));
              //console.log("User.rol: "+user.rol);

              // const db = firebase.database();
              // const userRef = db.ref('userProfile');
                        
              // const query = userRef.orderByChild('rol').equalTo('admin');
              // query.on('child_added', snap => {
              //   //console.log("SNAP.val JSON: "+JSON.stringify(snap.val()));
              //   //console.log("SNAP.val.rol: "+snap.val().rol);
              //   // fomare1979@hotmail.com
              //   let rol = snap.val().rol;
              //   console.log("ROL DEL USUARIO: "+rol);
              //   // if (rol == "admin"){
              //   //    this.logoutUser();
              //   //    //ir a pagina login
              //   //    this.navCtrl.setRoot(HomePage);
              //   // }
                
              //});  
              
            //});
  }

  /*
  signupUser(email: string, password: string): Promise<any> {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password) //hasta aquí crea el usuario
      .then(newUser => {                      //a partir de aquí guarda el email en el nodo userProfile
        firebase
          .database()
          .ref(`/userProfile/${newUser.uid}/email`) // uid identifica el nodo y es generado automáticamente por Firebase
          .set(email);
    })
    .catch(error => {
      console.error(error);
      throw new Error(error);
    });
  }
  */

  resetPassword(email:string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logoutUser(): Promise<void> {
    const userId: string = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref(`/userProfile/${userId}`)
      .off();
    return firebase.auth().signOut();
    }

}
