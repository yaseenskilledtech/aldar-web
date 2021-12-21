import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { convertSnaps } from 'src/app/share/utils/db.utils';
import { AboutUsItem, AboutUsModel, PricipleItem } from '../models/about';
import firebase from 'firebase/compat/app';

@Injectable()
export class AboutUsService {
  subject = new BehaviorSubject<AboutUsModel>({
    aboutUsMediaType: '',
    description: '',
    title: '',
    ourPrinciples: [],
    aboutUsItems: [],
    aboutUsMediaUrl: '',
    ourPrincipleMediaUrl: '',
  });

  aboutUs$: Observable<AboutUsModel> = this.subject.asObservable();

  collectionName = 'about-us-setting';
  aboutUsItemsName = 'about-us-items';
  principlesName = 'principle-items';

  constructor(private db: AngularFirestore) {
    this.db
      .collection(this.collectionName)
      .get()
      .pipe(
        switchMap((aboutSanp) => {
          const aboutUsData = convertSnaps<AboutUsModel>(aboutSanp);

          this.subject.next({ ...aboutUsData[0] });

          const aboutUsItems$ = this.db
            .collection<AboutUsModel>(this.collectionName)
            .doc(aboutUsData[0].id)
            .collection<AboutUsItem>(this.aboutUsItemsName, (ref) =>
              ref.where(
                firebase.firestore.FieldPath.documentId(),
                '!=',
                '--seqNo--'
              )
            )
            .valueChanges();

          const principles$ = this.db
            .collection<AboutUsModel>(this.collectionName)
            .doc(aboutUsData[0].id)
            .collection<PricipleItem>(this.principlesName, (ref) =>
              ref.where(
                firebase.firestore.FieldPath.documentId(),
                '!=',
                '--seqNo--'
              )
            )
            .valueChanges();

          return combineLatest([aboutUsItems$, principles$]).pipe(
            map(([items, principles]) => {
              this.subject.next({
                ...this.subject.getValue(),
                ourPrinciples: principles,
                aboutUsItems: items,
              });
            })
          );
        })
      )
      .subscribe();
  }
}
