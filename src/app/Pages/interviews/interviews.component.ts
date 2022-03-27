import { Component, OnInit } from '@angular/core';
import { getData, setData, downloadFile } from "../../../environments/apiServices.js"
import { convertDataObjToArray, createGroups, getTime } from "../../../environments/utils.js"

@Component({
  selector: 'app-interviews',
  templateUrl: './interviews.component.html',
  styleUrls: ['./interviews.component.scss']
})
export class InterviewsComponent implements OnInit {

  constructor() { }
  groupNum = "Group-0"
  groups = [{ groupId: "Group-0" }]
  currentGroup: any = {
    id: this.groupNum,
    aspirants: [{
      name: "Berojgar Aurat",
      imageUrl: "assets/icons/dp.png",
    }]
  }
  currentUser = this.currentGroup.aspirants[0]
  nextInLine = []

  ngOnInit() {
    getData(`Groups`).then((res) => {
      this.groups = Object.keys(res.data).map(key => ({
        ["groupId"]: key,
        aspirants: Object.keys(res.data[key]).map((aspKey) => ({
          ...res.data[key][aspKey]
        }))
      }))
      this.groupNum = this.groups.length > 0 ? this.groups[0].groupId : "Group-0";
      this.currentGroup = this.groups[0]
      let remainingAspirants = this.currentGroup.aspirants.filter((asp) => asp.endTime === "")
      this.currentUser = remainingAspirants[0]
      this.nextInLine = remainingAspirants.slice(1)
    }).catch()
  }

  onChangeGroupNum(value) {
    this.groupNum = value
    this.currentGroup = this.groups.find((grp) => grp.groupId === value)
    let remainingAspirants = this.currentGroup.aspirants.filter((asp) => asp.endTime === "")
    this.currentUser = remainingAspirants[0]
    this.nextInLine = remainingAspirants.slice(1)
  }

  downloadResume() {
    downloadFile(this.currentUser.resumeUrl);
  }

  markComplete() {
    let endTime = getTime()
    setData(`Aspirants/${this.currentUser.id}`, { ...this.currentUser, endTime })
    setData(`Groups/Group-${this.currentUser.groupNum}/${this.currentUser.id}`, { ...this.currentUser, endTime })
    this.groups = this.groups.map((grp: any) => (
      grp.groupId === `Group-${this.currentUser.groupNum}` ?
        {
          ...grp,
          aspirants: grp.aspirants.map((asp) => (
            asp.id === this.currentUser.id ?
              {
                ...asp,
                endTime
              } :
              asp
          ))
        }
        : grp))
    this.onChangeGroupNum(this.groupNum)
  }
}
