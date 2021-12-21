import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { convertSnap, convertSnaps } from 'src/app/share/utils/db.utils';
import { ViewSetting } from '../models/home';

@Injectable()
export class HomeService {
  private subjet = new BehaviorSubject<ViewSetting[]>([]);

  mainPageSetting$: Observable<ViewSetting[]> = this.subjet.asObservable();

  collectionName = 'main-page-settings';

  constructor(private db: AngularFirestore) {
    this.db
      .collection(this.collectionName)
      .get()
      .pipe(
        map((snaps) => {
          const data = convertSnaps<ViewSetting>(snaps).filter(
            (s) => s.id !== '--seqNo--'
          );

          this.subjet.next([...data]);
        }),
        shareReplay()
      )
      .subscribe();
  }
}
