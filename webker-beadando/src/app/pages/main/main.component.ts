import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {StatementService} from "../../shared/services/statement.service";
import {Statement} from "../../shared/model/Statement";
import {QuerySnapshot} from "@angular/fire/compat/firestore";
import {Timestamp} from "@angular/fire/firestore";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  statements: Array<Statement> = [];

  constructor(private router: Router, private stmtService: StatementService) {
    stmtService.getWithLimit(2).subscribe((data: QuerySnapshot<Statement>) => {
      this.statements = []
      data.docs.forEach(snap => {
        const stmt: Statement = {
          approved: snap.get('approved') as boolean,
          timestamp: snap.get('timestamp') as Timestamp,
          userid: snap.get('userId') as string,
          waterAmount: snap.get('waterAmount') as string
        };
        this.statements.push(stmt);
      });
    });
  }
}
