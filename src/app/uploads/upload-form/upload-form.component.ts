import {Component, Input, OnInit} from '@angular/core';
import { UploadService } from '../shared/upload.service';
import { Upload } from '../shared/upload';
import * as _ from 'lodash';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css']
})
export class UploadFormComponent {

  selectedFiles: FileList;
  currentUpload: Upload;

  @Input() public onUploadCallback: Function;
  @Input() public uploadType: any; // 0 = Profile picture, 1 = Dish1, 2 = Dish2, 3 = Dish3

  constructor(private upSvc: UploadService) {}

  async detectFiles(event) { // also automatically uploads so that the user does not have to do it manually
    this.selectedFiles = event.target.files;
    console.log(this.selectedFiles);
    this.uploadSingle();
  }


  async uploadSingle() {
    const file = this.selectedFiles.item(0);
    this.currentUpload = new Upload(file);
    await this.upSvc.pushUpload(this.currentUpload, this.uploadType, this.onUploadCallback);
    console.log('Upload Finished');
  }

  // uploadMulti() {
  //   const files = this.selectedFiles;
  //   const filesIndex = _.range(files.length);
  //   _.each(filesIndex, (idx) => {
  //     this.currentUpload = new Upload(files[idx]);
  //     this.upSvc.pushUpload(this.currentUpload, 0);
  //   });
  // }
}
