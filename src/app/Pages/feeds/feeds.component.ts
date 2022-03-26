import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.scss']
})
export class FeedsComponent implements OnInit {

  previewImage = null;

  constructor() { }

  ngOnInit() {
  }

  handleFileInput(file: FileList) {
    this.previewImage = file.item(0);
    const reader = new FileReader();
    reader.readAsDataURL(this.previewImage); // toBase64
    reader.onload = () => {
      this.previewImage = reader.result as string; // base64 Image src
    };
  }

}
