import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
  Query,
} from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Order } from 'src/app/profile/models/order';
import { FilterModel } from 'src/app/share/components/filter/filter.component';
import { convertSnaps } from 'src/app/share/utils/db.utils';

@Injectable()
export class OrderService {
  collectionName = 'requests';

  orderCollection!: AngularFirestoreCollection<Order>;

  subject = new BehaviorSubject<Order[]>([]);

  orders$: Observable<Order[]> = this.subject.asObservable();

  lastDoc!: Order;
  refDoc!: DocumentReference;
  constructor(private db: AngularFirestore) {
    this.orderCollection = this.db.collection(this.collectionName, (ref) =>
      ref.limit(6)
    );

    this.orderCollection
      .get()
      .pipe(
        map((snaps) => {
          this.refDoc = snaps.docs[snaps.docs.length - 1]?.ref;

          const orders = convertSnaps<Order>(snaps);
          this.subject.next([...orders]);
        })
      )
      .subscribe();
  }

  search(
    fieldName: string,
    searchKey: string,
    pageSize: number = 6
  ): Observable<Order[]> {
    const col = this.db.collection<Order>(this.collectionName, (ref) => {
      const filter = ref
        .orderBy(fieldName)
        .where(fieldName, '>=', searchKey)
        .where(fieldName, '<', searchKey + '\uf8ff')
        .limit(pageSize);

      return filter;
    });

    return col.get().pipe(
      map((snaps) => {
        this.refDoc = snaps.docs[snaps.docs.length - 1]?.ref;

        const orders = convertSnaps<Order>(snaps);

        this.subject.next([...orders]);

        return orders;
      })
    );
  }

  loadMore() {
    return this.db
      .collection<Order>(this.collectionName, (ref) =>
        ref.orderBy('uid', 'asc').limit(6).startAfter(this.refDoc.id)
      )
      .get()
      .pipe(
        map((snaps) => {
          const data = convertSnaps<Order>(snaps);

          this.refDoc = snaps.docs[snaps.docs.length - 1]?.ref;

          this.subject.next([...this.subject.getValue(), ...data]);
        })
      );
  }

  getOrdersForUnAuthonticateUsers() {
    return this.db
      .collection(this.collectionName, (ref) => ref.orderBy('id').limit(3))
      .get()
      .pipe(
        map((snaps) => {
          const orders = convertSnaps<Order>(snaps);
          this.subject.next([...orders]);
        })
      );
  }

  filter(filter: FilterModel[]) {
    const col = this.db.collection('requests', (ref) => {
      let query: Query = ref;

      filter.forEach((f) => {
        query = query.where(f.key, f.query, f.value.trim());
      });

      return query;
    });

    return col.get().pipe(
      map((snaps) => {
        const orders = convertSnaps<Order>(snaps);
        this.subject.next([...orders]);
      })
    );
  }
}
