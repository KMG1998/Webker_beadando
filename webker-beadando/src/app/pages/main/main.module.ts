import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MainRoutingModule} from './main-routing.module';
import {MainComponent} from './main.component';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";

@NgModule({
  declarations: [MainComponent],
  imports: [CommonModule, MainRoutingModule, MatButtonModule, MatListModule, MatIconModule, MatTableModule],
  exports: [
  ]
})
export class MainModule {
}
