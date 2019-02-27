import { Injectable } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import swal from 'sweetalert';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  hospital: Hospital;

  // totalHospitales: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
  ) {
   }

  cargarHospitales(desde: number = 0) {

    let url = URL_SERVICIOS + '/hospital?desde=' + desde;
    return this.http.get(url);
  }
  // Otra forma
  /*cargarHospitales() {
    let url = URL_SERVICIOS + '/hospital';
    return this.http.get(url)
    .pipe(map((resp:any) => {
      this.totalHospitales = res.total;
      return resp.hospitales;
    }));
  }*/

  obtenerHospital(id: string) {
    let url = URL_SERVICIOS + '/hospital' + id;
    return this.http.get(url)
          .pipe(map((resp: any) => resp.hospital));
  }

  cambiarImagen(archivo: File, id: string) {

    this._subirArchivoService.subirArchivo(archivo, 'hospitales', id)
              .then((resp: any) => {
                this.hospital.img = resp.hospital.img;
                swal('Imagen actualizada', this.hospital.nombre, 'success');
                // this.guardarStorage(id, this.token, this.usuario);
              })
              .catch(resp => {
                console.log(resp);
              });

  }

  crearHospital( nombre: string ) {

    let url = URL_SERVICIOS + '/hospital';
    url += '?token=' + this._usuarioService.token;

    return this.http.post( url, {nombre} )
                .pipe(map( (resp: any) => {
                swal('Hospital creado', nombre, 'success' );
                return resp.hospital;
              }));
  }

  actualizarHospital(hospital: Hospital) {

    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put(url, hospital)
            .pipe(map((resp: any) => {
                 swal('Hospital actualizado', hospital.nombre, 'success');
                return resp.Hospital;
              }));

  }

  buscarHospitales(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get(url)
    .pipe(map((resp: any) => resp.hospitales));
  }

  borrarHospital(id: string) {
    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete(url)
                    .pipe(map(resp => {
                      swal('Hospital borrado', 'El hospital a sido eliminado correctamente', 'success');
                      return true;
                    }));
  }

}
