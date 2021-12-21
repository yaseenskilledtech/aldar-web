import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {shareReplay, tap} from "rxjs/operators";

@Injectable({ providedIn: 'root'})
export class InitService {
  uid: string | undefined
  constructor(private auth: AngularFireAuth) {

  }

  init() {
    this.auth.authState.pipe(
      tap(user => this.uid = user?.uid),
      shareReplay()
    ).subscribe()
  }
}

