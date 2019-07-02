import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService { 

  usuario:Usuario;
  token:string;

  constructor(public http: HttpClient,
              public router: Router,
              public _subirArchivoService: SubirArchivoService) { 

    this.cargarStorage();

  }

  estarLogeado(){

    return (this.token.length > 5 )? true : false;

  }

  cargarStorage(){

    if (localStorage.getItem('token')){

      this.token   = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));

    }else{

      this.token = '';
      this.usuario = null;
    }

  }

  guardarStorage(id:string, token:string, usuario:Usuario){

        this.usuario = usuario;
        this.token   = token;

        localStorage.setItem('id', id);
        localStorage.setItem('token',token);
        localStorage.setItem('usuario', JSON.stringify(usuario) );

  }

  logOut(){

      this.usuario = null;
      this.token = '';

      localStorage.removeItem('token');
      localStorage.removeItem('usuario');

      this.router.navigate(['/login']);

  }

  loginGoogle(token:string){

    let url = URL_SERVICIOS + '/login/google';

    return this.http.post(url,{ token}).pipe(map((resp:any) => {

        this.guardarStorage(resp.id,resp.token,resp.usuario);

        return true;

    }));
  }

  login(usuario: Usuario, recordar: boolean = false){

    let url = URL_SERVICIOS + '/login';

    if(recordar){
      localStorage.setItem('email',usuario.email);
    }else{
      localStorage.removeItem('email');
    }

    return this.http.post(url, usuario).pipe(map((resp:any) => {

        localStorage.setItem('id', resp.id);
        localStorage.setItem('token',resp.token);
        localStorage.setItem('usuario', JSON.stringify(resp.usuario) );

        return true;

    }));

  }

  crearUsuario(usario: Usuario){

    let url = URL_SERVICIOS + '/usuario';

    return this.http.post(url,usario).pipe(map((resp:any) => {

      Swal.fire({
        type: 'success',
        title: 'Usuario creado',
        text: usario.email                   ,
      });

      return resp.usuario;

    }));

  }

  actualizarUsuario(usuario:Usuario){

    let url = URL_SERVICIOS + '/usuario/' + usuario._id;

    url += '?token='+this.token;

    return this.http.put(url,usuario).pipe(map((resp:any) =>{

        if(usuario._id === this.usuario._id){

          let usuarioDB: Usuario = resp.usuario;

          this.guardarStorage(usuario._id, this.token, usuarioDB);

        }

        Swal.fire({
          type: 'success',
          title: 'Usuario actualizado',
          text: usuario.nombre,
        });

        return true;

    }));

  }

  cambiarImagen(file: File, id:string){


    this._subirArchivoService.subirArchivo(file,'usuarios',id).then((resp: any) => {

      this.usuario.img = resp.usuario.img;

      Swal.fire({
        type: 'success',
        title: 'Imagen guardada correctamente.',
        text: resp.usuario.nombre,
      });

      this.guardarStorage(id,this.token,this.usuario);

    }).catch (resp => {

      console.log(resp);

    });

  }

  obtenerUsuarios(desde:number = 0){

    let url = URL_SERVICIOS + '/usuario?desde=' + desde;

    return this.http.get(url);

  }

  buscarUsuarios(termino:string){
    
    let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;

    return this.http.get(url).pipe(map( (resp:any) => resp.usuarios));

  }

  borrarUsuario(id:string){

    let url = URL_SERVICIOS + '/usuario/' + id;

    url += '?token=' + this.token;

    return this.http.delete(url).pipe(map( resp => {

              Swal.fire(
                'Eliminado!',
                'El usuario ha sido eliminado.',
                'success' );

              return true;

    }));

  }
  
}
