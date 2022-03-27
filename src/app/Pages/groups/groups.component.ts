import { Component, OnInit } from '@angular/core';
import { getData, setData } from "../../../environments/apiServices.js"
import { convertDataObjToArray, createGroups, getTime } from "../../../environments/utils.js"

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
  numberOfApplicants = 0;
  numberOfGroups = 0;
  factor = 2;
  constructor() { }

  ngOnInit() {
    getData("Aspirants").then((res) => {
      let aspirantData: any[] = convertDataObjToArray(res.data)
      this.numberOfApplicants = aspirantData.length
    }).catch()
    
    getData("Groups").then((res) => {
      let groupData: any[] = convertDataObjToArray(res.data)
      this.numberOfGroups = groupData.length
    }).catch()
  }

  async setAspirantGroupAndToken(aspirant, groupNum, tokenNum) {
    try {
      let path = `Aspirants/${aspirant.id}`
      await setData(path, {
        ...aspirant,
        groupNum,
        tokenNum,
        startTime: tokenNum === 1 ?
          getTime() :
          "",
        created_at: getTime(),
        endTime: ""
      })
    } catch (err) {
      console.log(" setAspirantGroupAndToken ~ err", err)
    }
  }

  async onClickSegregateGroups() {
    try {
      const aspirantRes = await getData("Aspirants");
      const aspirantData: any[] = convertDataObjToArray(aspirantRes.data)
      let groupData = [];
      let numberOfGroups = aspirantData.length % this.factor === 0 ?
        aspirantData.length / this.factor :
        Math.floor(aspirantData.length / this.factor) + 1;
      let aspPerGroup = Math.ceil(aspirantData.length / numberOfGroups);

      groupData = Array(numberOfGroups).fill('').map((_, grpIndex) => {
        let aspirantsInThisGroup: any[] = aspirantData.slice(grpIndex * aspPerGroup, (grpIndex + 1) * aspPerGroup)
        aspirantsInThisGroup = aspirantsInThisGroup.map((asp, aspIdx) => {
          this.setAspirantGroupAndToken(asp, grpIndex + 1, aspIdx + 1).catch()
          return {
            ...asp,
            groupNum: grpIndex + 1,
            tokenNum: aspIdx + 1,
            startTime: aspIdx === 0 ?
              getTime() :
              "",
            created_at: getTime(),
            endTime: ""
          }
        })
        return aspirantsInThisGroup
      })




      console.log("🚀 ~ file: groups.component.ts ~ line 23 ~ GroupsComponent ~ onClickSegregateGroups ~ groupData", groupData)

      //Convert GroupData to firebase obj
      let groupObj = {};

      groupData.forEach((grp, grpIdx) => {
        let grpObj = grp.reduce((obj, asp) => ({ ...obj, [asp["id"]]: asp }), {})
        groupObj = {
          ...groupObj,
          [`Group-${grpIdx + 1}`]: grpObj
        }
      })

      console.log("🚀 ~ file: groups.component.ts ~ line 45 ~ GroupsComponent ~ onClickSegregateGroups ~ groupObj", groupObj)

      setData("Groups", groupObj)

    } catch (err) {
      console.log(err)
    }
  }
}
