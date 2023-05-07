import {Component, OnInit} from '@angular/core';
import {StatementDisplay} from "../../shared/model/StatementDisplay";
import {DateFormatPipe} from "../../shared/pipes/date-format.pipe";
import {Router} from "@angular/router";
import {StatementService} from "../../shared/services/statement.service";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {QuerySnapshot} from "@angular/fire/compat/firestore";
import {Statement} from "../../shared/model/Statement";
import {Timestamp} from "@angular/fire/firestore";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit{
  statements: Array<StatementDisplay> = [];
  displayedColumns: Array<String> = ['date', 'waterAmount', 'approved', 'actions'];
  datePipe: DateFormatPipe = new DateFormatPipe();

  constructor(private router: Router,
              private stmtService: StatementService,
              private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      "delete",
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/svg/delete.svg")
    );
  }

  ngOnInit() {
    let userId = JSON.parse(localStorage.getItem('user') as string)['uid'];
    this.stmtService.getAll(userId).subscribe((data: QuerySnapshot<Statement>) => {
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
