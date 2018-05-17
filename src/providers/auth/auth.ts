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
  }

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
