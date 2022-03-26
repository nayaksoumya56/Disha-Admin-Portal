import { Component, OnInit } from '@angular/core';
import { uploadFile, downloadFile } from "../../../environments/apiServices.js"

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.scss']
})
export class FeedsComponent implements OnInit {

  previewImage = null;
  ImageFile = null;

  constructor() { }

  ngOnInit() {
  }

  handleFileInput(file: FileList) {
    this.previewImage = file.item(0);
    this.ImageFile = file.item(0);
    const reader = new FileReader();
    reader.readAsDataURL(this.previewImage); // toBase64
    reader.onload = () => {
      this.previewImage = reader.result as string; // base64 Image src
    };
  }

  async onClickUpload() {
    if (this.ImageFile) {
      await uploadFile('Feeds', this.ImageFile)
    } else {
      alert("no image found")
    }
  }
}
