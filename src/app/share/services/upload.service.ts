import { Injectable } from '@angular/core';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from "@angular/fire/compat/storage";
import {InitService} from "./init.service";

@Injectable()
export class UploadService {


  constructor(private storage: AngularFireStorage, private init: InitService) {
    console.log(init.uid)
  }

  upload(file: File): {
    task: AngularFireUploadTask,
    ref: AngularFireStorageReference
  } {

    const filePath = `images/${this.init.uid}/${file.name}`
    const task = this.storage.upload(filePath, file,{ cacheControl: "max-age=2592000,public" })
    const ref = this.storage.ref(filePath)
    return { task, ref  }

  }
}
