import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit, OnDestroy {

  intervalSubscription: Subscription;

  constructor() {
    //this.observable1();
    //this.observable2();

    /* this.returnObservable().pipe(
      retry(1) // por parametro se le envia el numero de veces que debe intentarlo
    ).subscribe(
      value => console.log('Subscribe: ', value),
      (err) => console.warn('Error: ', err),
      () => console.info('Complete...')
    ); */

    /* this.returnInterval()
      .subscribe(
        (value) => console.log( value )
      ); */

    /* this.returnInterval()
      .subscribe( console.log ); */

    this.intervalSubscription = this.returnInterval2().subscribe( console.log );
  }

  observable1() {
    const obs$ = new Observable( observer => {
      let i = -1;
      const interval = setInterval( () => {
        i++;
        observer.next(i);

        if (i == 5) {
          clearInterval(interval);
          observer.complete();
        }

        if (i == 2) {
          observer.error('I llego a 2');
        }
      }, 1000 )
    });

    obs$.subscribe(
      value => console.log('Subscribe: ', value),
      (err) => console.log('Error: ', err),
      () => console.log('Complete...')
    );
  }

  observable2() {
    let i = -1;

    const obs$ = new Observable( observer => {
      const interval = setInterval( () => {
        i++;
        observer.next(i);

        if (i === 5) {
          clearInterval(interval);
          observer.complete();
        }

        if (i === 2) {
          i = 0;
          console.log('i llego a dos error...');
          observer.error('I llego a 2');
        }
      }, 1000 )
    });

    obs$.pipe(
      retry(1) // por parametro se le envia el numero de veces que debe intentarlo
    ).subscribe(
      value => console.log('Subscribe: ', value),
      (err) => console.warn('Error: ', err),
      () => console.info('Complete...')
    );
  }

  returnObservable(): Observable<number> {
    let i = -1;

    //const obs$ = new Observable<number>( observer => {
    return new Observable<number>( observer => {
      const interval = setInterval( () => {
        i++;
        observer.next(i);

        if (i === 5) {
          clearInterval(interval);
          observer.complete();
        }

        if (i === 2) {
          //i = 0;
          console.log('i llego a dos error...');
          observer.error('I llego a 2');
        }
      }, 1000 )
    });

    //return obs$;
  }

  returnInterval() {
    //const interval$ = interval(1000)
    return interval(1000)
      .pipe(
        take(4), // cantidad de veces que se repite
        map( value => { // permite hacer operaciones y retornar solo lo necesario
          //return value + 1;
          return 'Hola mundo ' + value;
        })
      );

    //return interval$;
  }

  returnInterval2() { // filter
    return interval(500)
      .pipe(
        // take(10), si se quita esto queda indefinido
        map( value => value + 1 ),
        filter( value => (value % 2 === 0) ? true: false ), // debe retornar true para continuar
        //take(10)
      );
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.intervalSubscription.unsubscribe();
  }


}
