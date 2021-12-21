import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { convertSnaps } from 'src/app/share/utils/db.utils';
import { Category, Question } from '../models/faq';

@Injectable()
export class FaqService {
  collectionName = 'frequently-asked-questions';
  childCollectionName = 'questions';
  subject = new BehaviorSubject<Category[]>([]);

  faq$: Observable<Category[]> = this.subject.asObservable();

  constructor(private db: AngularFirestore) {
    this.db
      .collection(this.collectionName)
      .get()
      .pipe(
        switchMap((snaps) => {
          const categories = convertSnaps<Category>(snaps).filter(
            (cat) => cat.id !== '--seqNo--'
          );

          return forkJoin([
            ...categories.map((cat) => {
              return this.db
                .collection(this.collectionName)
                .doc(cat.id)
                .collection(this.childCollectionName)
                .get()
                .pipe(
                  map((quesSnaps) => {
                    const questions = convertSnaps<Question>(quesSnaps).filter(
                      (que) => que.id !== '--seqNo--'
                    );
                    cat.questions = questions;
                    this.subject.next([...this.subject.getValue(), cat]);
                    return cat;
                  })
                );
            }),
          ]);
        }),
        shareReplay()
      )
      .subscribe();
  }
}
