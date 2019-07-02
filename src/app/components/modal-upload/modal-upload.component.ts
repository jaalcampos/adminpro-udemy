import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { SubirArchivoService } from '../../services/subirArchivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  imagenSubir: File;
  imagenTemp: any;
  temporal:boolean = false;

  constructor(public _subirArchivoService:SubirArchivoService,
              public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
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

  subirImagen(){

    this._subirArchivoService.subirArchivo(this.imagenSubir,this._modalUploadService.tipo, this._modalUploadService.id)
                             .then( resp => {

                              this._modalUploadService.notificacion.emit(resp);
                              this.cerrarModal();

                             }).catch(err => {

                              console.log('Error', err);

                             })

  }

  cerrarModal(){

    this.imagenTemp  = null;
    this.imagenSubir = null;
    this.temporal    = false;
    this._modalUploadService.ocultarModal();

  }

}
