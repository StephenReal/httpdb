import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DbService } from '../services/db.service';
import { IPerson } from '../interfaces/iperson';

import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import * as _ from 'underscore';  

import { PagerService } from '../services/pager.service';
@Component({
  selector: 'app-removeperson',
  templateUrl: './removeperson.component.html',
  styleUrls: ['./removeperson.component.css']
})
export class RemovepersonComponent implements OnInit {
  
  baseURL = 'https://project-xd-dbef8.firebaseio.com/';
  rootNode = 'people';

  refID: any;
  fname: string;
  lname: string;

  person: object;
  
  @Output() deleteClicked = new EventEmitter<any>();


  peopleCollection: Array<IPerson> = [];

  constructor(private dbservice: DbService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() { 
     this.dbservice.getAllData(`${this.baseURL}/${this.rootNode}.json`)
     .subscribe(
       (response) => {
         this.peopleCollection = response;
        } ,
       (error) => console.log(error)
     );
  }

  deleteData(dataID) {
    // console.log(dataID);
    this.deleteClicked.emit(dataID);
  }

  removeData(id){
    console.log(id);
    this.refID = id;
    this.dbservice.deleteData(`${this.baseURL}/${this.rootNode}/${this.refID}.json`)
      .subscribe(
       (response) => {
        console.log(response)
       },
       (error) => console.log(error)
     );
  }


  
//-----------------------------------------------------




//-----------------------------------------------------
}
