import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  selectedTab: number = 1;

  constructor() { }

  ngOnInit() {
  }

  onTabSelected(tabItem: number) {
    this.selectedTab = tabItem;
  }

}
