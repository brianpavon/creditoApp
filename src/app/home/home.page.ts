import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  cargando : boolean = true
  usuario : any;
  constructor(public auth : AuthService,private usuarios : DbService) {
    this.usuarios.traerUsuarios().subscribe(users => {
      //console.log(users);
      users.forEach(user => {
        if(this.auth.mailLogueado == user.correo){
          this.usuario = user;
        }
      });
    })
    setTimeout(() => {
      this.cargando = false;
    }, 2000);
  }

  cargarCredito(valor : number){
    switch (valor) {
      case 10://cambiar por el codigo qr
        if(this.usuario.perfil == 'admin'){
          if(this.usuario.credito10 == 2){
            alert('NO PODES CARGAR MAS');
          }else{
            this.usuario.credito10++;
            this.usuario.credito += 10;
          }
        }else{
          if(this.usuario.credito10 == 1){
            alert('NO PODES CARGAR MAS');
          }else{
            this.usuario.credito10++;
            this.usuario.credito += 10;
          }
        }
        break;

      case 50:
        if(this.usuario.perfil == 'admin'){
          if(this.usuario.credito50 == 2){
            alert('NO PODES CARGAR MAS');
          }else{
            this.usuario.credito50++;
            this.usuario.credito += 50;
          }
        }else{
          if(this.usuario.credito50 == 1){
            alert('NO PODES CARGAR MAS');
          }else{
            this.usuario.credito50++;
            this.usuario.credito += 50;
          }
        }        
        break;

      case 100:
        if(this.usuario.perfil == 'admin'){
          if(this.usuario.credito100 == 2){
            alert('NO PODES CARGAR MAS');
          }else{
            this.usuario.credito100++;
            this.usuario.credito += 100;
          }
        }else{
          if(this.usuario.credito100 == 1){
            alert('NO PODES CARGAR MAS');
          }else{
            this.usuario.credito100++;
            this.usuario.credito += 100;
          }
        }        
        break;
    }
    this.usuarios.actualizarUsuario(this.usuario,this.usuario.uId)
  }

  vaciarCredito(){
    this.usuario.credito10 = 0
    this.usuario.credito50 = 0
    this.usuario.credito100 = 0
    this.usuario.credito = 0
    this.usuarios.actualizarUsuario(this.usuario,this.usuario.uId)
  }

}
