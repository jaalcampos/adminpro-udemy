import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/medico/medico.service';

@Component({
  selector: 'app-medicos', 
  templateUrl: './medicos.component.html',
  styleUrls: []
})
export class MedicosComponent implements OnInit {

  totalMedicos:number;
  medicos:Medico[]=[];
  cargando:boolean = false;

  constructor(public _medicosService:MedicoService) { }

  ngOnInit() {

    this.cargarMedicos();
  }

  cargarMedicos(){

     this.cargando = true;

     this._medicosService.cargarMedicos().subscribe((resp:any) => {

        this.medicos      = resp.medicos;
        this.totalMedicos = resp.total;
        this.cargando        = false;

     });

  }

  buscarMedico(termino:string){

    if (termino.length <= 0){
      this.cargarMedicos();
      return;
    }

    this._medicosService.buscarMedicos(termino).subscribe(resp => this.medicos = resp);

  }

  borrarMedico(id:string){

    this._medicosService.borrarMedico(id).subscribe(() => this.cargarMedicos());

  }

}
