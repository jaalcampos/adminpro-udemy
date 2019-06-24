import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  usuario:Usuario;
  imagenSubir: File;
  imagenTemp: any;
  temporal:boolean = false;

  constructor(public _usuarioService:UsuarioService) { 

    this.usuario = this._usuarioService.usuario;

  }

  ngOnInit() {
  }

  guardar(usuario:Usuario){

    this.usuario.nombre = usuario.nombre;

    if (!this.usuario.google){

      this.usuario.email  = usuario.email;

    }

    this._usuarioService.actualizarUsuario(this.usuario).subscribe(resp => {

      console.log(resp);

    });

  }

  seleccionarImagen(archivo:File){ 

    if(!archivo){

      this.imagenSubir = null;

      return;

    }

    if(archivo.type.indexOf('image') < 0){

      Swal.fire({
        type: 'error',
        title: 'Solo imagenes',
        text: 'El archivo seleccionado no es una imagen.',
      });

      this.imagenSubir = null;

      return;

    }

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () =>  {

      this.temporal   = true;
      this.imagenTemp = reader.result;

    }
    this.imagenSubir = archivo;

  }

  cambiarImagen(){

    this._usuarioService.cambiarImagen(this.imagenSubir,this.usuario._id);
    
  }

}
