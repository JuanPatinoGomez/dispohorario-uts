import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Usuario } from "../Usuario/usuario";
import { UsuarioForm } from "../Usuario/usuarioForm";
import { UsuarioService } from "../Usuario/usuario.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  titulo: string = "Login";

  usuarioForm: UsuarioForm={};
  usuario: Usuario={};
  errores: string[]=[];

  constructor(private usuarioService: UsuarioService,
    private router: Router,
    private activatedRouter: ActivatedRoute) {
      sessionStorage.clear();
     }

  ngOnInit(): void {
  }

  // validar(){
  //   console.log(

  //     this.usuarioService.validar(this.usuarioForm).subscribe({
  //       next: (usuario: Usuario)=>{
  //         this.router.navigate(['/sedes']);
  //       },
  //       error: (err)=>{
  //         this.errores = err.error.errors as string[];
  //         console.error('Código de error desde el backend: ' + err.status)
  //         console.error('Código de error desde el backend: ' + err.mensaje)
  //         console.error(err.error.errors)
  //       }
  //     })

  //   );
  // }

  validar(){
    this.usuarioService.validar(this.usuarioForm).subscribe(response =>{
      console.log(response)
      console.log(response['validacion'])
      if(response['validacion']){
        sessionStorage.setItem('user', this.usuarioForm.usuario);
        this.router.navigate(['/admin/sedes']);
      }else{
          mensajeCredencialesIncorrectas();
      }

    });
  }

}
function mensajeCredencialesIncorrectas() {
  const mensg = document.getElementById('avicredenciales');
  mensg.classList.remove('esconder');
}


