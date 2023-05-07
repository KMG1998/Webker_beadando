import {Component, OnInit} from '@angular/core';
import {StatementService} from "../../shared/services/statement.service";
import {FormBuilder} from "@angular/forms";
import {Timestamp} from "@angular/fire/firestore";
import {Statement} from "../../shared/model/Statement";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit{
  uploadForm = this._formBuilder.group({
    accepted: false,
    amount : '',
  });


  constructor(private _formBuilder: FormBuilder,private stmtService:StatementService,) {
  }
  ngOnInit(): void {
  }

  createStatement():void{
    let amount = this.uploadForm.get('amount')?.value as string;
    if(this.uploadForm.get('accepted')?.value && amount){
      let userId = JSON.parse(localStorage.getItem('user') as string)['uid'];
      const stmt:Statement = {
        approved: false, timestamp: Timestamp.now(), userid: userId, waterAmount: amount
      };
      this.stmtService.create(stmt).then(()=>console.log(stmt));
    }
  }

}
