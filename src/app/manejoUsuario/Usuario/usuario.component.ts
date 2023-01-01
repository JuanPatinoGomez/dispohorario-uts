import { Component, OnInit } from '@angular/core';
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

  constructor(private usuarioService: UsuarioService) { }

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
