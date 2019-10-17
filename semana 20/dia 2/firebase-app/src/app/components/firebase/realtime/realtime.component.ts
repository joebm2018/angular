import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database'
import { DatabaseReference, DataSnapshot } from '@angular/fire/database/interfaces';
@Component({
  selector: 'app-realtime',
  templateUrl: './realtime.component.html',
  styleUrls: ['./realtime.component.css']
})
export class RealtimeComponent implements OnInit {

  refUsuarios:DatabaseReference;
  constructor(private _srealtime:AngularFireDatabase) { 
    this.refUsuarios=this._srealtime.database.ref("usuarios");
  }
    
  ngOnInit() {
    
    // this.traerDataconOnce();
    this.traerDataconOn();
  }
  traerDataconOn(){
    this.refUsuarios.on('value',(data:DataSnapshot)=>{
      let objUsuarios=data.toJSON();  
      for(const key in objUsuarios){
        console.log(objUsuarios[key]);        
      }
    });
  }
  traerDataconOnce(){
    //key- de la referencia donde se encuentran
    console.log(this.refUsuarios.key);
    // referencia.on ('evento',(data)=>{}) trae la data del nodo cada vez que el 'evento' sucede
   
    // referencia.once('evento').then(()=>{})
    console.log(this.refUsuarios.once('value').then((data:DataSnapshot)=>{
      // console.log(data.toJSON());     //MUESTRA LOS DATOS D LA TABLA
    let objUsuarios=data.toJSON();  
      //iterando el objeto
      for(const key in objUsuarios){
        console.log(`llave:${key}`); // MUESTRA USU1 Y USU2
        console.log(objUsuarios[key]);        
      }
    }));
  }

}
