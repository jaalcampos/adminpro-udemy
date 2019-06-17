import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

//import swal from 'sweetalert';
//import * as swal from 'sweetalert';
import Swal from 'sweetalert2'
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

declare function init_plugins(); 

@Component({
  selector: 'app-login',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor(public _usarioService: UsuarioService,
              public router: Router) {
  }

  validarPassword(valor1:string, valor2:string){

      return (group: FormGroup) => {

        let pass1 = group.controls[valor1].value;
        let pass2 = group.controls[valor2].value;

        if (pass1 === pass2){

            return null;

        }

        return {

          validarPassword: true

        };

      }

  }

  ngOnInit() {

    init_plugins();

    this.forma = new FormGroup({
        
      //Primer parametro valor inicial y despues las validaciones.
      nombre: new FormControl(null, Validators.required),
      correo: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      condiciones: new FormControl(false)

    }, {validators: this.validarPassword('password','password2')});

  }

  registrarUsuario(){

    if(this.forma.invalid){
      return;
    }

    if(!this.forma.value.condiciones){
      Swal.fire({
        type: 'warning',
        title: 'Importante',
        text: 'Debe de aceptar las condiciones',
      });
      return;
    }

    let usuario = new Usuario(this.forma.value.nombre,
                              this.forma.value.correo,
                              this.forma.value.password);

    this._usarioService.crearUsuario(usuario).subscribe(resp => {

      console.log(resp);
      this.router.navigate(['/login']);

    });

  }

}
