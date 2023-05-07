import {Component, OnInit} from '@angular/core';
import {StatementService} from "../../shared/services/statement.service";
import {FormBuilder} from "@angular/forms";

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
    if(this.uploadForm.get('accepted')?.value){
      console.log(this.uploadForm.get('amount')?.value)
    }
  }

}
