import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { uploadFile, setData, firebaseDatabase } from "../../../environments/apiServices.js"
import { child, push, ref } from "firebase/database";
import { getTime } from "../../../environments/utils.js"
import { Router } from '@angular/router';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.scss']
})
export class FeedsComponent implements OnInit {

  previewImage = null;
  ImageFile = null;
  header = new FormControl('', [Validators.required]);
  detail = new FormControl('', [Validators.required]);
  constructor(private router: Router) { }

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
      let uploadRes = await uploadFile('Feeds', this.ImageFile)
      let imageUrl = uploadRes.downloadUrl;
      let postData = {
        created_at: getTime(),
        details: this.detail.value,
        header: this.header.value,
        imageUrl,
      }
      // Get a key for a new Post.
      const newPostKey = push(child(ref(firebaseDatabase), 'Feeds')).key;
      setData("Feeds/" + newPostKey, postData)
      // this.router.navigate(['/dashboard'])
      location.reload()
    } else {
      alert("no image found")
    }
  }
}
