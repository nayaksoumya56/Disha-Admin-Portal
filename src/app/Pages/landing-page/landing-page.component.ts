import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { getData, createTable, signUp, signIn } from '../../../environments/apiServices.js'

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  public lottieConfig: Object;
  isLogin = true;
  name = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  role = new FormControl('admin', [Validators.required]);

  
  constructor(private router: Router) {
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

  onClickSignUp() {
    signUp({
      name: this.name.value,
      email: this.email.value,
      password: this.password.value,
      role: this.role.value,
    }).then(() => this.toggleLogin()).catch()
  }
  onClickSignIn() {
    signIn({
      email: this.email.value,
      password: this.password.value,
    }).then(() => {
      this.router.navigate(['/dashboard'])
    })
    .catch()
  }
}
