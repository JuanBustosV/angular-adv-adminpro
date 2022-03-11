import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
// import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private usuarioService: UsuarioService,
               private router: Router ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    //   this.usuarioService.validarToken()
    //     .subscribe(resp => {
    //       console.log(resp);          
    //     });

    //   console.log('Pasó por el canActivate del guard');
    // return false;
    return this.usuarioService.validarToken()
      .pipe(
        tap( estaAutenticado => {

          if ( !estaAutenticado ) {
            this.router.navigateByUrl('/login');
          }
        })
      );
  }
  
}
