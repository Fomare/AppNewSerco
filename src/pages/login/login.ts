import { Component } from '@angular/core';
import {
  Alert,
  AlertController,
  IonicPage,
  Loading,
  LoadingController,
  NavController
} from 'ionic-angular';
import * as firebase from 'firebase';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public loginForm: FormGroup;
  public loading: Loading;  
  terms:boolean = false;
  mensajeError:string = '';

  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              public authProvider: AuthProvider,
              formBuilder: FormBuilder) {                             
                
    this.loginForm = formBuilder.group({
      email: [
        '',
        Validators.compose([Validators.required, EmailValidator.isValid])
      ],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    });
  } 

  goToResetPassword():void {
    this.navCtrl.push('ResetPasswordPage');
  }

  loginUser(): void {
    
    if (!this.loginForm.valid) {
      
    }
    if (!this.terms) {
      const alert: Alert = this.alertCtrl.create({
        message: "Debes aceptar los términos y condiciones de uso",
        buttons: [{ text: 'Ok', role: 'cancel' }]
      });
      alert.present();
    
    } else {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      this.authProvider.loginUser(email, password).then(
        authData => {
            this.loading.dismiss().then(() => {

              this.navCtrl.setRoot(HomePage);
              
          });
        },
        error => {

          if(error.message == 'The password is invalid or the user does not have a password.'){
            this.mensajeError ='Ups! Usuario o Contraseña incorrectos';            
          }
          if(error.message == 'There is no user record corresponding to this identifier. The user may have been deleted.'){
            this.mensajeError ='Ups! El usuario no existe';
          } 
          if(error.message == 'The email address is badly formatted.'){
            this.mensajeError ='Ups! El email no tiene un formato correcto';            
          } 

          this.loading.dismiss().then(() => {            
            const alert: Alert = this.alertCtrl.create({
              message: this.mensajeError,
              buttons: [{ text: 'Ok', role: 'cancel' }]
            });
            alert.present();
          });
        }
       
      );
      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }

}
