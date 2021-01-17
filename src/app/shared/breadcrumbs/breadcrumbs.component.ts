import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {

  public titulo: string;
  public tituloSubs$: Subscription;

  constructor( private router: Router/*, private route: ActivatedRoute*/ ) {

    // console.log( route.snapshot.children[0].data ); // solo se ejecuta la primera vez,TODO: subscribir en cambios hijos

    this.tituloSubs$ = this.getArgumentosRuta()//;
                            .subscribe( ({titulo}) => { // Usando desestructuración
                              console.log( titulo );
                              this.titulo = titulo;
                              document.title = `AdminPro - ${titulo}`;
                            });
  }
  ngOnDestroy(): void {
    //throw new Error('Method not implemented.');
    this.tituloSubs$.unsubscribe();
  }

  getArgumentosRuta() {

    //this.router.events
    return this.router.events
      .pipe(
        filter( event => event instanceof ActivationEnd ),
        filter( (event: ActivationEnd) => event.snapshot.firstChild === null),
        map( (event: ActivationEnd) => event.snapshot.data ) // nos quedamos con data
      );
      // // .subscribe( data => {
      // //   console.log( data );
      // //   this.titulo = data.titulo;
      //   .subscribe( ({titulo}) => { // Usando desestructuración
      //     console.log( titulo );
      //     this.titulo = titulo;
      //     document.title = `AdminPro - ${titulo}`;
    //});
  }

}
