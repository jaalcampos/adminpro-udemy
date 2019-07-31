import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { MedicoService } from '../../services/medico/medico.service';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Medico } from '../../models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[]=[];
  medico:Medico = new Medico('','','','','');
  hospital:Hospital = new Hospital('');

  constructor(public _medicoService:MedicoService,
              public _hospitaleService:HospitalService,
              public _modalUploadService:ModalUploadService,
              public router:Router,
              public activatedRoute: ActivatedRoute) {

                this.activatedRoute.params.subscribe( paramas => {

                    let id = paramas['id'];

                    if(id != 'nuevo'){

                      this.cargarMedico(id);

                    }

                });

               }

  ngOnInit() {

    this._hospitaleService.cargarHospitales().subscribe((resp:any) => {
        this.hospitales = resp.hospitales;
    });

    this._modalUploadService.notificacion.subscribe(resp => {

       console.log(resp);

       this.medico.img = resp.medico.img;

    });

  }

  guardarDatos(form:NgForm){

    if(form.invalid){

      return;

    }

    this._medicoService.guardarMedico(this.medico).subscribe(medico => {

        this.medico._id = medico._id;
      
        this.router.navigate(['/medico',medico._id]);

    });

  }

  cambioHospital(id:string){

    this._hospitaleService.obtenerHospital(id).subscribe(hospital => this.hospital = hospital);

  }

  cargarMedico(id:string){

    this._medicoService.cargarMedico(id).subscribe(medico => {

        this.medico =  medico;
        this.medico.hospital = medico.hospital._id;
        this.cambioHospital(this.medico.hospital);

    });

  }

  cambiarFoto(){

    this._modalUploadService.mostrarModal('medicos', this.medico._id);

  }

}
