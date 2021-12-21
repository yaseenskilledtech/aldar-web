import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {BehaviorSubject, from, Observable, throwError,} from "rxjs";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {catchError, concatMap, shareReplay, tap} from "rxjs/operators";
import {LoadingService} from "../../share/services/loading.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Profile} from "../models/profile";
import firebase from "firebase/compat/app";
import firestore = firebase.firestore;
import  { remove } from 'lodash'
import {AngularFireStorage} from "@angular/fire/compat/storage";



@Injectable()
export class ProfileService {


  private userDocument!: AngularFirestoreDocument<Profile>

  private subject = new BehaviorSubject<Profile | undefined>(undefined)

  user$: Observable<Profile | undefined> = this.subject.asObservable()

  loading$: Observable<boolean>

  constructor(private db: AngularFirestore, private auth: AngularFireAuth, private storage: AngularFireStorage,
              private loadingService: LoadingService, private snack: MatSnackBar) {
    this.initDoc()
    this.loading$ = loadingService.loading$
  }

  initDoc() {
    this.auth.authState.pipe(
      concatMap(value => this.db.doc<Profile>(`users/${value?.uid}`).get()),
      tap(user => {
        this.userDocument = this.db.doc<Profile>(`users/${user.id}`)
        this.subject.next(user.data())
      }),
      shareReplay()
    ).subscribe()
  }


  updateProfile(profile: Partial<Profile>) {

    const loading = from(this.userDocument.update(profile)

      // on success update user data
      .then(() => {
        const oldProfile = this.subject.value
        const newProfile: Profile = {...oldProfile, ...profile} as Profile
        this.subject.next(newProfile)
        this.snack.open('تم حفظ التعديل بنجاح')
      })

      // on failure  update user data
      .catch(() => this.snack.open('لم يتم حفظ التعديل حدث خطأ'))
    )

    this.loadingService.showLoaderUntilCompleted(loading).subscribe()
  }

   addImage(image: string) {
    const profileRef = this.userDocument.ref
    profileRef.update({ images: firestore.FieldValue.arrayUnion(image)})
      .then(() => {
        const profile = this.subject.value
        profile?.images.push(image)
        this.subject.next(profile)
      })
      .catch(() => this.snack.open('image upload failure'))
  }


  removeImage(image: string) {
    const profileRef = this.userDocument.ref
    profileRef.update({ images: firestore.FieldValue.arrayRemove(image)})
      .then( () => {
         this.deleteFromStorageByUrl(image)
        const profile = this.subject.value
        if (profile?.images && profile.images.length) {
           remove(profile?.images, (ix) => ix == image )
           this.subject.next(profile)
        }
      })

      .catch(() => this.snack.open('image delete failure'))
  }


  deleteFromStorageByUrl(url: string) {
    this.storage.refFromURL(url).delete().pipe(catchError(err => {
      console.log('image not found ')
      return throwError(err)
    }),
      shareReplay()
    ).subscribe()
  }




}
