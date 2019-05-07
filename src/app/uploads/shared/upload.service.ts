import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {FirebaseListObservable} from '@angular/fire/database-deprecated';
import {Upload} from './upload';
import * as firebase from 'firebase/app';
import { AuthService} from '../../auth-service/auth.service';
import 'firebase/storage';  // <----



@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private db: AngularFireDatabase, private authService: AuthService) { }

  private basePath: string;
  uploads: FirebaseListObservable<Upload[]>;

  async pushUpload(upload: Upload, type, runCallback: Function) {

    /* Types
     * 0 = profilePic
     * 1 = dish1Pic
     * 2 = dish2Pic
     * 3 = dish3Pic
     */

    if (!this.authService.isLoggedIn) {
      console.log('not logged in');
      return;
    }

    const uid = this.authService.userData.uid;
    this.basePath = `chef/${uid}`;
    const fileName = Math.random().toString(36).substring(2);

    const storageRef = firebase.storage().ref(`${this.basePath}/`);
    const uploadTask = storageRef.child(`${fileName}`).put(upload.file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    const self = this;
    uploadTask.on('state_changed', function(snapshot) {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
      upload.progress = progress;

      console.log('Upload is ' + progress + '% done');
      switch (uploadTask.snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
      }
    }, function(error) {
      // Handle unsuccessful uploads
    }, function() {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        console.log('File available at', downloadURL);
        upload.url = downloadURL;
        upload.name = upload.file.name;
        console.log('FILE' + upload.name, upload.url);
        self.saveFileData(upload, type);
        runCallback();
      });
    });
  }



  // Writes the file details to the realtime db
  private saveFileData(upload: Upload, type) {
    // this.db.list(`${this.basePath}/`).push(upload);

    const userList = this.db.list(`/chef`);

    if (type === 0) { // profilePic
      console.log('type 0' + upload.url);
      userList.update(this.authService.userData.uid,
        {
          profilePic: upload.url
        });
    }
    else if (type === 1) {
      console.log('type 1');

      userList.update(this.authService.userData.uid,
        {
          dishPic1: upload.url
        });
    }
    else if (type === 2) {
      console.log('type 2');

      userList.update(this.authService.userData.uid,
        {
          dishPic2: upload.url
        });
    }
    else { // type 3
      console.log('type 3');

      userList.update(this.authService.userData.uid,
        {
          dishPic3: upload.url
        });
    }
  }

  deleteUpload(upload: Upload) {
    this.deleteFileData(upload.$key)
      .then( () => {
        this.deleteFileStorage(upload.name);
      })
      .catch(error => console.log(error));
  }

  // Deletes the file details from the realtime db
  private deleteFileData(key: string) {
    return this.db.list(`${this.basePath}/`).remove(key);
  }

  // Firebase files must have unique names in their respective storage dir
  // So the name serves as a unique key
  private deleteFileStorage(name: string) {
    const storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`).delete();
  }
}
