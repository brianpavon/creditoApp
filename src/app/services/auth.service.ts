import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userFirebase : any;
  toast;

  constructor(private auth:AngularFireAuth,private router: Router) {
    this.toast= Swal.mixin({
      toast: true,
      position: 'bottom-start',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    })
  }

  async register(email: string, password: string){
    return this.auth.createUserWithEmailAndPassword(email,password)
    .then(() => {
      this.router.navigate(['/home']);
    })
    .catch(
      e => this.thrownErrorsRegister(e.code)
    )
  }

  async login(email:string, password:string){
    return this.auth.signInWithEmailAndPassword(email,password)
      .then(
        e=>{
          this.loginExitoso('Bienvenido nuevamente!');
          this.router.navigate(['/home']);
        }
      )
      .catch( e =>
        this.thrownErrorsLogin(e.code)
      )
  }

  logout(){    
    this.router.navigate(['/home']);
    return this.auth.signOut();
  }

  obtenerUsuarioLogueado(){
    return this.auth.authState
  }

  async enviarMailParaVerificar(){
    return this.auth.currentUser.then(
      user=>{
        return user?.sendEmailVerification();
      }
    )
  }

  loginExitoso(message:string){
    this.toast.fire({
      title: message,
      icon: 'success', 
    })    
  }



  //Funcion que lanzara los diferentes mensajes de error en el login
  thrownErrorsRegister(type:any){
    switch (type) {
      case 'auth/email-already-in-use':
        Swal.fire({
          title: 'El email ingresado ya se encuentra registrado',
          icon: 'error',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Aceptar',
          heightAuto: false
        });
        break;
      case 'auth/invalid-email':
        Swal.fire({
          title: 'El email ingresado no es v&aacute;lido',
          icon: 'error',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Aceptar',
          heightAuto: false
        });
        break;
      case 'auth/operation-not-allowed':
        Swal.fire({
          title:'Ha ocurrido un error con el registro, contacte al administrador.',
          text:'Contacte a este mail: admin@yateayudo.com',
          icon: 'error',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Aceptar',
          heightAuto: false
        });
        break;
      case 'auth/weak-password':
        Swal.fire({
          title: 'Contraseña insegura',
          text: 'Ingrese una contraseña que tenga 1 mayúscula, 8 caracteres mínimo y un caracter especial',
          icon: 'error',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Aceptar',
          heightAuto: false
        });
        break;

      default:
        Swal.fire({
          title: 'Ocurrió un error en el registro.',
          icon: 'error',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Aceptar',
          heightAuto: false
        });
        break;
    }
  }

   //Funcion que lanzara los diferentes mensajes de error en el login
   thrownErrorsLogin(type:any){
    switch (type) {
      case 'auth/invalid-email':
        Swal.fire({
          title: 'El email ingresado no es v&aacute;lido',
          icon: 'error',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Aceptar',
          heightAuto: false
        });
        break;
      case 'auth/user-disabled':
        Swal.fire({
          title: 'Contacte al administrador su email fue dado de baja',
          icon: 'error',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Aceptar',
          heightAuto: false
        });
        break;
      case 'auth/user-not-found':
        Swal.fire({
          title:'Usuario no registrado. Registrese.',
          icon: 'error',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Aceptar',
          heightAuto: false
        });
        break;
      case 'auth/wrong-password':
        Swal.fire({
          title: 'La contraseña no es v&aacute;lida para este mail',
          icon: 'error',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Aceptar',
          heightAuto: false
        });
        break;

      default:
        Swal.fire({
          title: 'Ocurri&oacute; un error al intentar ingresar.',
          icon: 'error',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Aceptar',
          heightAuto: false
        });
        break;
    }
  }
}
