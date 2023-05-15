import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formRegistro:FormGroup;

  constructor(private auth : AuthService,private fb : FormBuilder) { 
    this.formRegistro = this.fb.group(
      {
        'email':['',[Validators.required,Validators.email]],
        'pass':['',[Validators.required,Validators.minLength(6)]]
      }
    );
  }

  ngOnInit() {
  }

  async login(){
    try {
      await this.auth.login(this.formRegistro.value.email,this.formRegistro.value.pass);
      this.formRegistro.reset();
    } catch (error) {
      console.log(error);      
    }
  }

  cargarUsuario(event:any){
    const rol = event.target.value;
    switch (rol) {
      case 'admin':
        this.logueoRapido('admin@admin.com','111111');        
        break;
      case 'usuario':
        this.logueoRapido('usuario@usuario.com','333333');
        break;
      case 'anonimo':
        this.logueoRapido('anonimo@anonimo.com','444444');
        break;
      case 'tester':
        this.logueoRapido('tester@tester.com','555555');
        break;
      case 'invitado':
        this.logueoRapido('invitado@invitado.com','222222');
        break;      
    }
    
    
  }

  logueoRapido(email:string,pass:string){
    this.formRegistro.controls['email'].patchValue(email);
    this.formRegistro.controls['pass'].patchValue(pass);
  }

}
