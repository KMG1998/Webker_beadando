import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {StatementService} from "../../shared/services/statement.service";
import {Statement} from "../../shared/model/Statement";
import {QuerySnapshot} from "@angular/fire/compat/firestore";
import {Timestamp} from "@angular/fire/firestore";
import {StatementDisplay} from "../../shared/model/StatementDisplay";
import {DateFormatPipe} from "../../shared/pipes/date-format.pipe";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  statements: Array<StatementDisplay> = [];
  datePipe: DateFormatPipe = new DateFormatPipe();
  userId = JSON.parse(localStorage.getItem('user') as string)['uid'];
  hidden:boolean = false;
  displayedColumns: Array<String> = ['date', 'waterAmount', 'approved', 'actions'];

  constructor(private router: Router,
              private stmtService: StatementService,
              private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      "delete",
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/svg/delete.svg")
    );
    if (window.screen.width === 360) {
      this.hidden = true;
    }
    //simulate approval on back-end
    const rndInt = Math.floor(Math.random() * 10) + 1
    console.log(rndInt)
    if(rndInt >= 2 && rndInt <= 4){
      console.log("approving")
      stmtService.getAll(this.userId).subscribe((data: QuerySnapshot<Statement>) => {
        data.forEach(snap => {
          const stmt: Statement = {
            timestamp: snap.get('timestamp') as Timestamp,
            userid: snap.get('userid') as string,
            approved: snap.get('approved') as boolean,
            waterAmount: snap.get('waterAmount') as string
          };
          if(!stmt.approved){
            stmt.approved = true;
            stmtService.update(snap.id,stmt).then().catch((error)=>console.log("error during apprve:"+error));
          }
        });
      })
    }
  }

  ngOnInit() {
    this.stmtService.getWithLimit(this.userId,2).subscribe((data: QuerySnapshot<Statement>) => {
      this.statements = []
      data.docs.forEach(snap => {
        const stmt: StatementDisplay = {
          approved: snap.get('approved') as boolean,
          date: ((snap.get('timestamp') as Timestamp).toDate()).toISOString(),
          waterAmount: snap.get('waterAmount') as string,
          id: snap.id
        };
        stmt.date = this.datePipe.transform(stmt.date,'YYYY.MM.dd HH:mm');
        this.statements.push(stmt);
      });
    });
  }

  deleteStatement(index:number){
    this.stmtService.delete(this.statements[index]['id']).then(
      () => {
        console.log("delete success")
        window.location.reload()
      }
    ).catch((error)=>{
      console.log(error)
    })
  }

}
