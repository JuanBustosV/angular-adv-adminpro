import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {

  public intervalSubs: Subscription;

  constructor() {     

    // // obs$.pipe(
    // this.retornaObservable().pipe(
    //   retry(2)
    // ).subscribe( // hace funcionar el observable, con subscribe
    //   valor => console.log('Subs:', valor ),
    //   error => console.warn('Error:', error),
    //   () => console.info('Obs terminado')
    // );

    this.intervalSubs = this.retornaIntervalo()
      // .subscribe(
      //   (valor) => console.log( valor )
      // )
      .subscribe(console.log)
  }

  ngOnDestroy(): void {
    //throw new Error('Method not implemented.');
    this.intervalSubs.unsubscribe();
  }

  retornaObservable(): Observable<number> {

    let i:number = -1;

    //const obs$ = new Observable<number>( observer => {      
    return new Observable<number>( observer => {  

      const intervalo = setInterval( () => {

        //console.log('tick');
        i++;
        observer.next(i);

        if ( i === 4 ) {
          clearInterval( intervalo);
          observer.complete();
        }

        if ( i === 2 ) {
          // console.log('i = 2.... error');
          i = 0;
          observer.error('i llegó al valor de 2');
        }

      }, 1000);

    });
   
    //return obs$;
  }

  // retornaIntervalo(): Observable<string> {K
  retornaIntervalo(): Observable<number> {
    //const intervalo$ = interval(1000)
    // return interval(1000)
    //                     .pipe(
    //                       take(4),
    //                       // map( valor => {
    //                       //   return 'Hola mundo ' + (valor + 1);
    //                       // })
    //                       map( valor => 'Hola mundo ' + (valor + 1))                          
    //                     );

    //return intervalo$;

    return interval(100)
                        .pipe(                          
                          //take(10), // el orden importa, 5 primeros pares
                          map( valor => valor + 1),
                          filter( valor => ( valor % 2 === 0) ? true: false ), // nos quedamos con 10 pares
                          //take(10) // sin take se detiene por el unsubcribe
                        );
  }
}
