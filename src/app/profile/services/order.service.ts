import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {BehaviorSubject, from, Observable,} from "rxjs";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {concatMap, shareReplay, tap} from "rxjs/operators";
import {LoadingService} from "../../share/services/loading.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Order} from "../models/order";

@Injectable()
export class OrderService {


  private orderDocument!: AngularFirestoreDocument<Order>

  private subject = new BehaviorSubject<Order | undefined>(undefined)

  order$: Observable<Order | undefined> = this.subject.asObservable()

  loading$: Observable<boolean>

  constructor(private db: AngularFirestore, private auth: AngularFireAuth, private loadingService: LoadingService, private snack: MatSnackBar) {
    this.initDoc()
    this.loading$ = loadingService.loading$
  }

  initDoc() {
    this.auth.authState.pipe(
      concatMap(value => this.db.doc<Order>(`orders/${value?.uid}`).get()),
      tap(user => {
        this.orderDocument = this.db.doc<Order>(`orders/${user.id}`)
        this.subject.next(user.data())
      }),
      shareReplay()
    ).subscribe()
  }


  updateProfile(order: Order) {

    const loading = from(this.orderDocument.set(order)

      // on success update user data
      .then(() => {
        const oldOrder = this.subject.value
        const newOrder: Order = {...oldOrder, ...order} as Order
        this.subject.next(newOrder)
        this.snack.open('تم حفظ التعديل بنجاح')
      })

      // on failure  update user data
      .catch(() => this.snack.open('لم يتم حفظ التعديل حدث خطأ'))
    )

    this.loadingService.showLoaderUntilCompleted(loading).subscribe()
  }


}
