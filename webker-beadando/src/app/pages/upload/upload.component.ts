import {Component, OnInit} from '@angular/core';
import {StatementService} from "../../shared/services/statement.service";
import {FormBuilder, Validators} from "@angular/forms";
import {Timestamp} from "@angular/fire/firestore";
import {Statement} from "../../shared/model/Statement";
import {Router} from "@angular/router";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit{
  uploadForm = this._formBuilder.group({
    accepted: [false,{ validators: [Validators.required], updateOn: "change" }],
    amount : ['',{ validators: [Validators.required,Validators.min(1)], updateOn: "change" }]
  });


  constructor(private _formBuilder: FormBuilder,private stmtService:StatementService,private router:Router) {
  }
  ngOnInit(): void {
  }

  createStatement():void{
    if(this.accepted?.value == true) {
      console.log(this.uploadForm.errors)
      if (this.uploadForm.valid) {
        let userId = JSON.parse(localStorage.getItem('user') as string)['uid'];
        const stmt: Statement = {
          approved: false,
          timestamp: Timestamp.now(),
          userid: userId,
          waterAmount: this.uploadForm.get('amount')?.value as string
        };
        this.stmtService.create(stmt).then(() => this.router.navigateByUrl('/main')).catch((error) => console.error(error));
      }
    }else {
      this.accepted?.setErrors({'required':true});
    }
  }
  get accepted(){
    return this.uploadForm.get('accepted')
  }
  get amount(){
    return this.uploadForm.get('amount')
  }
}
