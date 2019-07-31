import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import Swal from 'sweetalert2'
import { map } from 'rxjs/operators';
import { Medico } from '../../models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  token:string;

  constructor(public http:HttpClient) { 

    this.token = localStorage.getItem('token');

  }

  cargarMedicos(desde:number = 0){

    let url = URL_SERVICIOS + '/medico?desde='+desde;

    return this.http.get(url);

  }

  borrarMedico(id:string){

    let url = URL_SERVICIOS + '/medico/'+id;

    url += '?token=' + this.token;

    return this.http.delete(url).pipe(map((resp:any) => {

      console.log(resp);

      Swal.fire(
        'Eliminado!',
        'El hospital ha sido eliminado.',
        'success' );

      return true;
 
    })); 

  }

  buscarMedicos(termino:string){
    
    let url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;

    return this.http.get(url).pipe(map( (resp:any) => resp.medicos));

  }

  guardarMedico(medico:Medico){

    let url = URL_SERVICIOS + '/medico';
    
    if(medico._id){
      //actualizando

      url += '/'+medico._id +'?token=' + this.token;

      return this.http.put(url,medico).pipe(map((resp:any) => {

        Swal.fire(
          'Actualizado!',
          'El médico ha sido actualizado.',
          'success' );

        console.log(resp);
  
        return resp.medicoGuardado;

      }));


    }else{
      //creando

      url += '?token=' + this.token;
     
      return this.http.post(url,medico).pipe(map((resp:any) => {

      Swal.fire(
        'Creado!',
        'El médico ha sido creado.',
        'success' );

      return resp.medico;

    }));

    }

  }

  cargarMedico(id:string){

    let url = URL_SERVICIOS + '/medico/' + id;

    return this.http.get(url).pipe(map((resp:any) => resp.medico));

  }

}
