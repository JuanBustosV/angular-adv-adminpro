import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';

import { Usuario } from '../models/usuario.model';


const base_url = environment.base_url;

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  public usuario: Usuario;

  constructor( private http: HttpClient,
               private router: Router,
               private ngZone: NgZone ) {
    this.googleInit()
  }

  // Getters
  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.usuario.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  googleInit() {

    return new Promise<void>( resolve => {
      console.log('google init');

      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '433899414544-vpc85rfdetsokjd0h3tfshpmtacdmds5.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });

        resolve();
      });
      
    });
          
  }

  logout() {
    localStorage.removeItem('token');
    
    this.auth2.signOut().then(() => {

      // ejecutar fuera de angular
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });

    });
  }

  validarToken(): Observable<boolean> {
    // const token = localStorage.getItem('token') || '';

    return this.http.get(`${ base_url }/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map( (resp: any) => {
        //  console.log(resp.usuario);
        //this.usuario = resp.usuario; no copia los métodos
        const { email, google, nombre, role, img = '', uid } = resp.usuario;

        // Crear nueva instancia del usuario
        this.usuario = new Usuario( nombre, email, '', img, google, role, uid);
        // this.usuario.imprimirUsuario();
        localStorage.setItem('token', resp.token );
        return true;
      }),
      // map( resp => true),
      catchError( error => of(false))
      // catchError( error => {
      //   console.log(error);
      //   return of(false);
      // })
    );
  }

  crearUsuario ( formData: RegisterForm ) {
    
    return this.http.post(`${ base_url }/usuarios`, formData )
                  .pipe(
                    tap( (resp: any) => {                  
                    localStorage.setItem('token', resp.token );
                  } )
                );

  }

  actualizarPerfil( data: { email: string, nombre: string, role: string } ) {

    data = {
      ...data,
      role: this.usuario.role
    }

    return this.http.put(`${ base_url }/usuarios/${ this.uid }`, data, this.headers);
  }

  login( formData: LoginForm ) {
    
    return this.http.post(`${ base_url }/login`, formData )
                  .pipe(
                    tap( (resp: any) => {
                      // console.log(resp);
                      localStorage.setItem('token', resp.token );
                    } )
                  );

  }

  loginGoogle( token ) {
    
    return this.http.post(`${ base_url }/login/google`, { token } )
                  .pipe(
                    tap( (resp: any) => {
                      // console.log(resp);
                      localStorage.setItem('token', resp.token );
                    } )
                  );

  }

  cargarUsuarios( desde: number = 0) {

    //localhost:3000/api/ususarios?desde=0
    const url = `${ base_url }/usuarios?desde=${ desde }`;
    // return this.http.get<{ total: number, usuarios: Usuario[] }>( url, this.headers );
    return this.http.get<CargarUsuario>( url, this.headers )
            .pipe(
              // delay(1000),
              map( resp => {
                console.log();
                const usuarios = resp.usuarios.map( 
                  user => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uid )
                );

                return {
                  total: resp.total,
                  usuarios
                }
              })
            )
  }

  eliminarUsuario( usuario: Usuario ) {
    // console.log('eliminando...');

    // /api/usuarios/60169ac2115026324cc63a36
    const url = `${ base_url }/usuarios/${ usuario.uid }`;
    return this.http.delete( url, this.headers );
  }

  guardarUsuario( usuario: Usuario ) {

    return this.http.put(`${ base_url }/usuarios/${ usuario.uid }`, usuario, this.headers);
  }

}


