import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from "@angular/router";
import { UsuarioService } from "./usuario.service";
import { Usuario } from "./usuario";

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  title = 'Usuarios';
  usuarios: Usuario[]=[];

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
    this.getUsuarios();
  }

  getUsuarios(): void{
    this.usuarioService.getUsuarios().subscribe(response =>{
      this.usuarios = response;
    });
  }

  delete(usuario: Usuario): void{
    this.usuarioService.delete(usuario).subscribe({
      next: () => {
        this.usuarios = this.usuarios.filter(sed => sed != usuario)
      }
    });
  }

  cambiarEstado(usuario: Usuario): void{
    let pos = this.usuarios.indexOf(usuario);
    this.usuarioService.cambioEstado(usuario).subscribe(response =>{
      console.log("usuario pos" + this.usuarios[pos])
      console.log("respuesta" + response)
        this.usuarios[pos] = response;
    });
  }

}
