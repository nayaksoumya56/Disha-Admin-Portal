import { Component, OnInit } from '@angular/core';
import { getData, setData } from "../../../environments/apiServices.js"
import { convertDataObjToArray } from "../../../environments/utils.js"

@Component({
  selector: 'app-payment-approval',
  templateUrl: './payment-approval.component.html',
  styleUrls: ['./payment-approval.component.scss']
})
export class PaymentApprovalComponent implements OnInit {
  searchText = ""
  aspirantData = []
  unfilteredData = []
  selectedUser = undefined
  hideDetail = false
  constructor() { }

  ngOnInit() {
    getData("Aspirants").then(res => {
      this.aspirantData = convertDataObjToArray(res.data)
      this.unfilteredData = this.aspirantData
    }).catch()

  }

  onChangeSearchText(value) {
    this.searchText = value
    let compareString = String(value).toLowerCase()
    this.aspirantData = compareString.length > 0 ?
      this.unfilteredData.filter((asp) => (
        String(asp.id).toLowerCase().includes(compareString) ||
        String(asp.name).toLowerCase().includes(compareString))
      ) :
      this.unfilteredData
  }
  onClickAspirantItem(clickedUser) {
    this.selectedUser = clickedUser
    this.hideDetail = true
  }
  markPaid() {
    setData(`Aspirants/${this.selectedUser.id}`, { ...this.selectedUser, student: true })
  }
}
