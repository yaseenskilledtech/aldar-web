import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { convertSnaps } from 'src/app/share/utils/db.utils';
import { StratigyCard } from '../models/stratigy';

@Injectable()
export class StratigyService {
  private subjet = new BehaviorSubject<StratigyCard[]>([]);

  stratigies$: Observable<StratigyCard[]> = this.subjet.asObservable();

  collectionName = 'stratigy';
  constructor(private db: AngularFirestore) {
    this.db
      .collection(this.collectionName)
      .get()
      .pipe(
        map((snaps) => {
          const stratigies = convertSnaps<StratigyCard>(snaps).filter(
            (s) => s.id !== '--seqNo--'
          );
          console.log(stratigies)
          this.subjet.next([...stratigies]);
        })
      )
      .subscribe();
  }
}
