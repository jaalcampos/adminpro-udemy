import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Usuario } from '../../models/usuario.model';
import { Medico } from '../../models/medico.model';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: []
})
export class BusquedaComponent implements OnInit {

  usuarios:Usuario   []=[];
  medicos:Medico     []=[];
  hospitales:Hospital[]=[];

  constructor(public activatedRoute:ActivatedRoute,
              public http:HttpClient) { 

      activatedRoute.params.subscribe(paramas => {

          let termino = paramas['termino'];

          this.buscar(termino);

      })

  }

  ngOnInit() {
  }

  buscar(termino:string){

    let url = URL_SERVICIOS + '/busqueda/todo/' + termino;

    this.http.get(url).subscribe((resp:any) => {

        this.usuarios   = resp.usuarios;
        this.medicos    = resp.medicos;
        this.hospitales = resp.hospitales;

    });

  }

}
