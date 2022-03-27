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
    if (location.search.split("?").length) {
      if (location.search.split("?").find(x => x.includes("selectedTab")).length) {
        this.selectedTab = Number(location.search.split("?").find(x => x.includes("selectedTab")).split("=")[1])
      }
    }
  }

  onTabSelected(tabItem: number) {
    this.selectedTab = tabItem;
  }

}
