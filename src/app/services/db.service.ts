import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  itemsCollection !: AngularFirestoreCollection<any>;
  todosLosUsuarios !: Observable<any[]>;

  constructor(private firestore:AngularFirestore) { }

  traerUsuarios(){
    this.itemsCollection = this.firestore.collection<any>('usuarios');
    return this.todosLosUsuarios = this.itemsCollection.valueChanges();
  }
  actualizarUsuario(atributo: any, id: any){
    this.firestore.collection('usuarios').doc(id).set(atributo,{merge:true});
  }
}
