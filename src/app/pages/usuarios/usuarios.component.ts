import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import Swal from 'sweetalert2'
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usurios:Usuario[] = [];
  desde:number = 0;
  registros: number = 0;
  cargando:boolean = true;

  constructor(public _usuarioService: UsuarioService,
              public _modalUploadService: ModalUploadService) { }

  ngOnInit() {

    this.cargarUsuarios();

    //Sucribirnos al sistema de notificaciones 
    this._modalUploadService.notificacion.subscribe( resp => this.cargarUsuarios());

  }

  cargarUsuarios(){

    this.cargando = true;

    this._usuarioService.obtenerUsuarios(this.desde).subscribe((resp:any) =>{

      this.registros = resp.total;
      this.usurios   = resp.usuarios;

      this.cargando = false;

    });

  }

  cambiarPaginacion(valor:number){

    let auxDesde = this.desde + valor;

    if (auxDesde >= this.registros){
      
        return;

    }

    if(auxDesde < 0 ){

        return;

    }

    this.desde = this.desde + valor;
    this.cargarUsuarios();

  }

  buscarUsuario(termino:string){

    if (termino.length <= 0 ) {

        this.cargarUsuarios();
        return;

    }

    this.cargando = true;

    this._usuarioService.buscarUsuarios(termino).subscribe((usuarios: Usuario[]) =>{

       this.usurios = usuarios;
       this.cargando = false;

    });

  }
  
  borrarUsuario(usuario:Usuario){

    if (usuario._id === this._usuarioService.usuario._id){

      Swal.fire({
        type: 'warning',
        title: 'No puede borrar usuario.',
        text: 'No se puede borrar a si mismo.',
      });

      return;

    }

    Swal.fire({
      title: 'Estas seguro?',
      text: 'Esa a punto de borrar a ' + usuario.nombre,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminarlo!'
    }).then((result) => {
      if (result.value) {

        this._usuarioService.borrarUsuario(usuario._id).subscribe( resp => {

          console.log(resp);
          this.cargarUsuarios();

        });

      }
    })

  }

  guardarUsuario(usuario:Usuario){

    this._usuarioService.actualizarUsuario(usuario).subscribe();

  }

  mostrarModal( id:string){

    this._modalUploadService.mostrarModal('usuarios',id);

  }

}
