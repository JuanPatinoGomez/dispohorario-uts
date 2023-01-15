import { Component, OnInit } from '@angular/core';
import { UsuarioService } from "./usuario.service";
import { Usuario } from "./usuario";
import { Router, ActivatedRoute } from "@angular/router";
import { UsuarioForm } from "./usuarioForm";

@Component({
  selector: 'app-form-usuarios',
  templateUrl: './form-usuarios.component.html',
  styleUrls: ['./form-usuarios.component.css'] 
})
export class FormUsuariosComponent implements OnInit {

  titulo: string = "Crear Usuario";

  usuarioForm: UsuarioForm={};
  usuario: Usuario={};
  errores: string[]=[];

  constructor(private usuarioService: UsuarioService,
              private router: Router,
              private activatedRouter: ActivatedRoute) { 
                this.userLogin();
              }

  userLogin() {
    console.log(sessionStorage.getItem('user') === null)
    if (sessionStorage.getItem('user') === null) {
      console.log(sessionStorage.getItem('user') === null)
      this.router.navigate(['/login']);
    }
  }
  ngOnInit(): void {
  }

  create(): void{

    // let utf8Encode = new TextEncoder();
    // //Se arma el usuario para poder enviarlo a back
    // this.usuario.usuario = this.usuarioForm.usuario;
    // for (let i = 0; i < this.usuarioForm.contrasena.length; i++) {
    //   this.usuario.contrasena.push(this.usuarioForm.contrasena.charAt(i));
    // }

    this.usuarioService.create(this.usuarioForm).subscribe({
      next: (usuario: Usuario)=>{
        this.router.navigate(['/admin/usuarios']);
      },
      error: (err)=>{
        this.errores = err.error.errors as string[];
        console.error('Código de error desde el backend: ' + err.status)
        console.error(err.error.errors)
      }
    });
  }

}
