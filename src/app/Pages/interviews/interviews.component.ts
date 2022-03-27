import { Component, OnInit } from '@angular/core';
import { getData, setData } from "../../../environments/apiServices.js"

@Component({
  selector: 'app-interviews',
  templateUrl: './interviews.component.html',
  styleUrls: ['./interviews.component.scss']
})
export class InterviewsComponent implements OnInit {

  constructor() { }
  groupNum = 3
  groups = [{ groupId: 1 }, { groupId: 2 }, { groupId: 3 }, { groupId: 4 }, { groupId: 5 }, { groupId: 6 },]
  ngOnInit() {
  }

}
