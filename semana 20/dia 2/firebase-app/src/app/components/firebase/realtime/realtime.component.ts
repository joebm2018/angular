import { Component, OnInit, NgZone } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database'
import { DatabaseReference, DataSnapshot } from '@angular/fire/database/interfaces';
import Swal from 'sweetalert2';
// importando clases para formulrios reactivos
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Logs } from 'selenium-webdriver';
@Component({
  selector: 'app-realtime',
  templateUrl: './realtime.component.html',
  styleUrls: ['./realtime.component.css']
})
export class RealtimeComponent implements OnInit {
  // const Swal = require('sweetalert2')
  refUsuarios:DatabaseReference;
  listaUsuarios:Array<any>;
  formulario:FormGroup;
  constructor(private _srealtime:AngularFireDatabase,
              private _szone:NgZone) { 
    this.refUsuarios=this._srealtime.database.ref("usuarios");
    //INICIALIZANDO EL FORMULARIO REACTIVO
    this.formulario=new FormGroup(
      //ESPEJO DE TODO LOS CONTROLES DE LA VISTA
      {
        "campo_nombre":new FormControl('',Validators.required),
        "campo_apellido":new FormControl('',Validators.required),
        "campo_imagen":new FormControl('',Validators.required),
        "campo_email":new FormControl('',[
                                          Validators.required,
                                          Validators.pattern("[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$")
                                         ]),
      }
    );
  }
  // elemento submit del forulario reactivo
  onSubmit(){
    console.log(this.formulario);
    //OBTENER EL OBJETO USUARIO DEL FORMUALRIO
    console.log(this.formulario.value);
    // OBTENER LA REFERENCIA DEL IMPUT EMAIL
    this.formulario.get('campo_email');
    console.log(this.formulario.get('campo_email').value);
    
  }
  ngOnInit() {
    
    // this.traerDataconOnce();
    //this.traerDataconOn();
    this.traerUsuariosConOn();
  }
  // otra forma de traer los datos con ON y itera con foreach
  traerUsuariosConOn(){
    this.refUsuarios.on('value',(usuariosSnaps:DataSnapshot)=>{
      let usuariosTmp=[];
      usuariosSnaps.forEach(usuario=>{
        let objUsuarioTmp={
          id:usuario.key,
          nombre:usuario.val().nombre,
          apellido:usuario.val().apellido,
          imagen:usuario.val().imagen
        }
        // console.log(objUsuarioTmp);
        usuariosTmp.push(objUsuarioTmp);
        
          
      })
      this._szone.run(()=>{
        this.listaUsuarios=usuariosTmp;
      })
    })
  }

  // trae la data con la funcion on e itera la los objetos con un ciclo for in
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
  eliminarUsuario(id){
    // db->usuarios->id(del registro a borrar)
    Swal.fire({
      title: 'Esta Seguro de Borrar?',
      text: "no hay marcha atras!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar!'
    }).then((rpta) => {
      if (rpta.value) {
        this.refUsuarios.child(id).remove().then(()=>{
          Swal.fire(
            'Deleted!',
            'Registro Borrado Correctamente.',
            'success'
            
          )
        }) 
        
      }
    })

    // this.refUsuarios.child(id).remove().then(()=>{
    //   console.log("Registro Borrado Correctamente");
    // });
    
  }

}
