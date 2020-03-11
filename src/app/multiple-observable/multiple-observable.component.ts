import { Component, OnInit } from '@angular/core';
import { of, forkJoin, throwError, Observable, zip } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-multiple-observable',
  templateUrl: './multiple-observable.component.html',
  styleUrls: ['./multiple-observable.component.scss']
})
export class MultipleObservableComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.handleMultipleObservable().subscribe(
      (result: any) => {
        console.log('forkJoin-success', result);
      },
      (error) => {
        error.subscribe(errRes => {
          console.log('forkJoin-errRes', errRes);
        });
        console.log('forkJoin-error', error);
      }
    )
  }

  private handleMultipleObservable(): Observable<any> {
    const data1 = {
      name: 'Fardeen Ahmad'
    };
    const data2 = {
      name: 'Shavez Ahmad'
    };
    const data3 = {
      name: 'Siraj Ahmad'
    };

    const $obs1 = of(data2).pipe(delay(1000))
      .pipe(
        map((res) => { console.log('res', res); }),
        catchError(error => of(error))
      );
    const $obs3 = of(data3).pipe(delay(500)).pipe(catchError(error => of(error)));
    // const $obs2 = of(data1).pipe(delay(1500),
    //   map(val => {
    //     console.log('error from obs2', val);
    //     throw throwError(val);
    //   })
    // ).pipe(catchError(error => of(error)));

    // const $obs2 = of(data1).pipe(delay(1500),
    //   map(val => {
    //     console.log('error from obs2-01', val);
    //     throw throwError(val);
    //   })
    // ).pipe(catchError(error => {
    //   console.log('error from obs2-02', error);
    //   return of(error);
    // }));
    const $obs2 = of(data1).pipe(delay(1500),
      map(val => {
        throw throwError(val);
      })
    ).pipe(catchError(err => {
      console.log('error of obs2', err);
      return of(
        {
          isError: true,
          error: err
        }
      )
    }));
    return forkJoin([$obs1, $obs2, $obs3]);

    // forkJoin([$obs1, $obs2, $obs3])
    //   .subscribe(
    //     (next) => console.log('forkJoin-success', next),
    //     (error) => console.log('forkJoin-error', error)
    //   );

    // const $obs1 = of(data2).pipe(delay(1500)).pipe(catchError(error => error));
    // const $obs3 = of(data3).pipe(delay(500)).pipe(catchError(error => error));
    // const $obs2 = of(data1).pipe(delay(500),
    //   map(val => {
    //     console.log('obs2-eeor', val);
    //     throw throwError(val);
    //   })
    // ).pipe(catchError(error => error));

    // forkJoin([$obs1, $obs2, $obs3])
    //   .subscribe(
    //     (next) => console.log('forkJoin-success', next),
    //     (error) => console.log('forkJoin-error', error)
    //   );
    // zip($obs1, $obs2, $obs3)
    //   .pipe(
    //     map(([obs1, obs2, obs3]) => {
    //       // forkJoin returns an array of values, here we map those values to an object
    //       return { obs1, obs2, obs3 };
    //     })
    //   )
    //   .subscribe(result => {
    //     console.log('result', result);
    //   }, error => {
    //     console.log('errorResult', error);
    //   })
  }

}
