import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';
import swal from 'sweetalert';

// import { subscribe } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;

  imagenSubir: File;

  imagenTemp: string;

  constructor(public _usuarioService: UsuarioService) {

    // Cargar informacion del usuario
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit() {
  }

  guardar(usuario: Usuario) {

    this.usuario.nombre = usuario.nombre;
    if (!this.usuario.google) {
        this.usuario.email = usuario.email;
    }
      // ARREGLAR ERROR DEL SUBSCRIBE
    this._usuarioService.actualizarUsuario( this.usuario);
    // .subscribe();
  }

  selecionImagen(archivo: File) {

    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    if (archivo.type.indexOf('image') < 0 ) {
      swal('Solo imganes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
    }

    this.imagenSubir = archivo;

    // Pre-cargar imagen

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => this.imagenTemp = reader.result;
  }

  cambiarImagen() {
      this._usuarioService.cambiarImagen(this.imagenSubir, this.usuario._id);
  }

}
