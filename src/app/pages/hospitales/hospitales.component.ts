import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Hospital } from '../../models/hospital.model';
import Swal from 'sweetalert2'
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales:Hospital[] = [];
 
  cargando:boolean = false;
  desde:number     = 0;

  totalHospitales: number;

  constructor(public _hospitalService:HospitalService,
              public _modalUploadService:ModalUploadService) { }

  ngOnInit() {

    this.cargarHospitales();

    this._modalUploadService.notificacion.subscribe(() => this.cargarHospitales());

  }

  cargarHospitales(){

    this.cargando = true;

    this._hospitalService.cargarHospitales(this.desde).subscribe((resp:any) =>{

        this.totalHospitales = resp.total;
        this.hospitales      = resp.hospitales;
        this.cargando        = false;

    });

  }

  buscarHospital(termino:string){

    if(termino.length <= 0){

        this.cargarHospitales();
        return;

    }

    this._hospitalService.buscarHospitales(termino).subscribe(resp => {
      
      this.hospitales = resp
    
    });

  }

  gurdarHospital(hospital:Hospital){

    this._hospitalService.actualizarHospital(hospital).subscribe();

  }

  borrarHospital(id:string){

    this._hospitalService.borrarHospital(id).subscribe(resp => {

      this.cargarHospitales();

    });

  }

  crearHospital(){

    Swal.fire({
      title:"Crear nuevo hospital",
      input:'text',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText:'Cancelar',
      inputPlaceholder:'Nombre hospital',
      inputValidator: (value) => {

        if(!value || value.length === 0){
          return 'Ingresa el nombre del hospital';
        }

      }
    }).then((result) => {

      this._hospitalService.crearHospital(result.value).subscribe(() => this.cargarHospitales());

    });

  }

  actualizarImagen(hospital:Hospital){

    this._modalUploadService.mostrarModal('hospitales',hospital._id);

  }

}
