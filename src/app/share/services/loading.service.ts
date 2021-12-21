import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";
import {finalize, shareReplay, switchMap, tap} from "rxjs/operators";

@Injectable()
export class LoadingService {

  private subject = new BehaviorSubject<boolean>(false)
  loading$: Observable<boolean> = this.subject.asObservable()

  loadingOn() {
    this.subject.next(true)
  }

  loadingOff() {
    this.subject.next(false)
  }

  showLoaderUntilCompleted<T>(obs$: Observable<T>): Observable<T> {
    return of(null)
      .pipe(
        tap(() => this.loadingOn()),
        switchMap(() => obs$),
        finalize(() => this.loadingOff()),
        shareReplay()
      )
  }
}

