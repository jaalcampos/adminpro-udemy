import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { map, retry } from 'rxjs/operators';
import Swal from 'sweetalert2'
import { Hospital } from '../../models/hospital.model';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  token:string;

  constructor(public http:HttpClient) { 

      this.token = localStorage.getItem('token');

  }

  cargarHospitales(desde:number = 0){

    let url =  URL_SERVICIOS + '/hospital?desde=' + desde;

    return this.http.get(url);

  } 

  obtenerHospital(id:string){
    
    let url = URL_SERVICIOS + '/hospital/' + id;

    return this.http.get(url).pipe(map((resp:any) => resp.hospital));

  }

  borrarHospital(id:string){

    let url = URL_SERVICIOS + '/hospital/' + id;

    url += '?token=' + this.token;

    return this.http.delete(url).pipe(map((resp:any) => {

      Swal.fire(
        'Eliminado!',
        'El hospital '+  resp.hospitalRemove.nombre + ' ha sido eliminado.',
        'success' );

      return true;
 
    })); 

  }

  crearHospital(nombre:string) {

    let url = URL_SERVICIOS + '/hospital';

    url += '?token=' + this.token;

    return this.http.post(url,{ nombre: nombre}).pipe(map((resp:any) =>{

      Swal.fire(
        'Creado!',
        'El hospital '+  resp.hospital.nombre + ' ha sido creado.',
        'success' );

      return true;

    }));

  }

  buscarHospitales(termino:string){
    
    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;

    return this.http.get(url).pipe(map( (resp:any) => resp.hospitales));

  }

  actualizarHospital(hospital:Hospital){

    let url = URL_SERVICIOS + '/hospital/' + hospital._id;

    url += '?token=' + this.token;

    return this.http.put(url,hospital).pipe(map((resp:any) => {
      
      Swal.fire(
        'Actualizdo!',
        'El hospital ha sido actualizdo.',
        'success' );

      return true;

    }));

  }

} 
