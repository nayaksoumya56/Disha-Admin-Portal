import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  public lottieConfig: Object;
  isLogin = false;

  constructor() {
    this.lottieConfig = {
      path: 'assets/lottie/office.json',
      renderer: 'canvas',
      autoplay: true,
      loop: true
  };
  }

  ngOnInit() {
  }

}
