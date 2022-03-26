import { Component, OnInit } from '@angular/core';
import { getData, createTable, dropTable } from '../../../environments/apiServices.js'
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  public lottieConfig: Object;
  isLogin = true;

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

  toggleLogin() {
    this.isLogin = !this.isLogin;
  }

}
