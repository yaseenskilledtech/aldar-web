import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Order } from 'src/app/profile/models/order';
import { convertSnaps } from 'src/app/share/utils/db.utils';
import { BlogModel } from '../models/blog';

@Injectable()
export class BlogsService {
  collectionName = 'blogs-settings';

  orderCollection!: AngularFirestoreCollection<Order>;

  subject = new BehaviorSubject<BlogModel[]>([]);

  blogs$: Observable<BlogModel[]> = this.subject.asObservable();

  lastDoc!: BlogModel;
  refDoc!: DocumentReference;

  constructor(private db: AngularFirestore) {
    this.orderCollection = this.db.collection(this.collectionName, (ref) =>
      ref.limit(6)
    );

    this.orderCollection
      .get()
      .pipe(
        map((snaps) => {
          const blogs = convertSnaps<BlogModel>(snaps);

          this.refDoc = snaps.docs[snaps.docs.length - 1].ref;
          this.subject.next([...blogs]);
        })
      )
      .subscribe();
  }

  search(
    fieldName: string,
    searchKey: string,
    pageSize: number = 6
  ): Observable<BlogModel[]> {
    const col = this.db.collection<BlogModel>(this.collectionName, (ref) => {
      const filter = ref
        .orderBy(fieldName)
        .where(fieldName, '>=', searchKey)
        .where(fieldName, '<', searchKey + '\uf8ff')
        .limit(pageSize);

      return filter;
    });

    return col.get().pipe(
      map((snaps) => {
        const blogs = convertSnaps<BlogModel>(snaps);

        this.subject.next([...blogs]);
        this.refDoc = snaps.docs[snaps.docs.length - 1]?.ref;

        return blogs;
      })
    );
  }

  loadMore() {
    return this.db
      .collection<BlogModel>(this.collectionName, (ref) =>
        ref.orderBy('id', 'asc').limit(6).startAfter(this.refDoc.id)
      )
      .get()
      .pipe(
        map((snaps) => {
          const blogs = convertSnaps<BlogModel>(snaps);

          this.refDoc = snaps.docs[snaps.docs.length - 1]?.ref;

          this.subject.next([...this.subject.getValue(), ...blogs]);

          return blogs;
        })
      );
  }
}
