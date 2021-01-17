import { Component, OnInit } from '@angular/core';
//import { rejects } from 'assert';
//import { resolve } from 'dns';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    // this.getUsuarios( usuarios => {}
    //    console.log(usuarios);
    // });
    this.getUsuarios().then( usuarios => console.log( usuarios) );

    //this.getUsuarios();
    // const promesa = new Promise( ( resolve, reject ) => {

    //   //console.log('Hola Mundo');
    //   if ( false ) {
    //     resolve('Hola Mundo');
    //   } else {
    //     reject('Algo salió mal');
    //   }

    // });

    // promesa.then( (mensaje) => { // es la parte asíncrona
    //   console.log('Fin promesa: ' + mensaje);
    // })
    // .catch( error => console.log('* Error en mi promesa: ', error));

    // console.log('Fin del Init');
  }

  getUsuarios(): Promise<any> {

    //const promesa = new Promise( resolve => {
    return new Promise( resolve => {  

      fetch('https://reqres.in/api/users')
        .then( resp => resp.json() )
        .then( body => resolve( body.data ));
      //.then( resp =>  {
        //resp.json().then( body => console.log(body) );
      //});//console.log( resp ));
    });

    //return promesa;
  }
}
