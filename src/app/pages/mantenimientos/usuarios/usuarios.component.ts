import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { delay } from 'rxjs/operators';

import { Usuario } from 'src/app/models/usuario.model';

import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];

  public imgSubs: Subscription;
  public pagDesde: number = 0;
  public cargando: boolean = true;

  constructor( private usuarioService: UsuarioService,
               private busquedasService: BusquedasService,
               private modalImagenService:ModalImagenService ) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {

    this.cargarUsuarios();

    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe( img => {
        console.log(img);
        this.cargarUsuarios()});
    
  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService.cargarUsuarios( this.pagDesde )
      .subscribe( ({ total, usuarios }) => {
        // console.log( resp );
        this.totalUsuarios = total;
        // if ( usuarios.length !== 0 ) {
          this.usuarios = usuarios;
          this.usuariosTemp = usuarios;
          this.cargando = false;
        // }
      })
  }

  cambiarPagina( valor: number ){
    this.pagDesde += valor;

    if ( this.pagDesde < 0 ){
      this.pagDesde = 0;
    } else if ( this.pagDesde >= this.totalUsuarios ) {
      this.pagDesde -= valor;
    }

    this.cargarUsuarios();
  }

  buscar( termino: string ){
    console.log( termino );

    if ( termino.length === 0 ) {
      return this.usuarios = this.usuariosTemp;
    }

    this.busquedasService.buscar( 'usuarios', termino)
        // .subscribe( resp => console.log(resp));
        .subscribe( resp => {

          this.usuarios = resp;

        });
  }

  eliminarUsuario( usuario: Usuario ) {

    if ( usuario.uid === this.usuarioService.uid ) {
      return Swal.fire('Error', 'No puede borrarse a si mismo');
    }

    // console.log( usuario );
    Swal.fire({
      title: '¿Borrar usuario?',
      text: `Esta a punto de borrar a ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      // confirmButtonColor: '#3085d6',
      // cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        // Swal.fire(
        //   'Deleted!',
        //   'Your file has been deleted.',
        //   'success'
        // )
        this.usuarioService.eliminarUsuario( usuario )
          .subscribe( resp => {
            this.cargarUsuarios();
            Swal.fire(
              'Usuario borrado',
              `${ usuario.nombre } fue eliminado correctamente`,
              'success'
            )         
          });

      }
    })

  }

  cambiarRole( usuario: Usuario ) {
    // console.log( usuario );

    this.usuarioService.guardarUsuario(usuario)
      .subscribe( resp => {
        console.log(resp);
      });
  }

  abrirModal( usuario: Usuario ) {
    // console.log(usuario);
    this.modalImagenService.abrirModal('usuarios', usuario.uid, usuario.img);
  }

}
