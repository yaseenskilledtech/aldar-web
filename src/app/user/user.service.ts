import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase/compat/app';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';

import { User } from './user';
import { FirebaseErrors } from '../share/utils/firebase-errors';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class UserService {


  private subject = new BehaviorSubject<User | undefined>(undefined)

  user$: Observable<User | undefined> = this.subject.asObservable()

 private loadingSubject = new BehaviorSubject<boolean>(false)

 loading$: Observable<boolean> = this.loadingSubject.asObservable()


  constructor(private db: AngularFirestore, private afAuth: AngularFireAuth, private router: Router, private snake: MatSnackBar) {}

  getUser(id: string) {
    this.db.doc<User>(`users/${id}`).get()
      .pipe(
        tap(snap => this.subject.next(snap.data())),
        shareReplay()
      ).subscribe()
  }

   signIn(email: string, password: string) {
     this.loadingSubject.next(true)
      this.afAuth.signInWithEmailAndPassword(email, password)

      .then( result => {
        const user = result.user
        // if (!user?.emailVerified) {
        //     user?.sendEmailVerification()
        //     this.snake.open('your account not activated')
        //     return this.router.navigateByUrl(`user/__/auth/action?mode=sendVerifyEmail&email=${email}`)
        // } else {
          return this.router.navigateByUrl('/')
       // }
      })

      .catch(err => this.snake.open( FirebaseErrors.Parse(err.code)))

      .finally(() => this.loadingSubject.next(false))


  }

   createUser(user: User) {
    const { email, fullName, phone, gender, password } = user
    this.loadingSubject.next(true)

    this.getSeqNo().subscribe(seqNo => {


      this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(res => {

        if (res && res.user) {

          res.user.sendEmailVerification()

          const increment = firebase.default.firestore.FieldValue.increment(1)


              const userRef = this.db.collection(`users`).doc(res.user?.uid).ref

              const seqRef = this.db.collection(`users`).doc('--seqNo--').ref

              const batch = this.db.firestore.batch()

              batch.set(userRef, { email, fullName, phone, gender, password, seqNo, createdAt: Date.now() })

              batch.set(seqRef, { seqNo: increment }, { merge: true })

              batch.commit()
              .then(() => this.router.navigateByUrl(`user/__/auth/action?mode=sendVerifyEmail&email=${email}`))
              .catch(err => this.snake.open(FirebaseErrors.Parse(err.code)) )
              .finally(() => this.loadingSubject.next(false))

        }
      })
      .catch(err => {
        this.snake.open(FirebaseErrors.Parse(err.code))
        this.loadingSubject.next(false)
      })

    })


  }



  getSeqNo(): Observable<number> {

    return this.db.collection<User>('users', ref => ref.orderBy('seqNo', "desc").limit(1)).get()
      .pipe(
        map(snaps => {
          const results = snaps.docs.map(r => r.data())
          return results[0]?.seqNo ?? 0
        }
        )
      )
  }


  verificationCode(code: string) {
    this.afAuth.checkActionCode(code)

    .then((r) => {
         this.afAuth.applyActionCode(code)
         this.snake.open('verify your email success')
         return this.router.navigateByUrl('/user/login')
    })

    .catch(err => {
      this.snake.open(err.code)
    })
  }


  forgotPassword(email: string) {

    this.loadingSubject.next(true)

    this.afAuth.sendPasswordResetEmail(email)

    .then( r => this.router.navigateByUrl(`user/__/auth/action?mode=sendVerifyEmail&email=${email}`))

    .catch(err => this.snake.open(FirebaseErrors.Parse(err.code)))

    .finally(() => this.loadingSubject.next(false))

  }


  resetPassword(code: string, password: string) {
    this.loadingSubject.next(true)

   this.afAuth.confirmPasswordReset(code, password)

     .then(() => {
       this.snake.open('reset password success')
       return  this.router.navigateByUrl('/user/login')
     })

     .catch(err => this.snake.open( FirebaseErrors.Parse(err.code)))

     .finally(() => this.loadingSubject.next(false))
  }

}
