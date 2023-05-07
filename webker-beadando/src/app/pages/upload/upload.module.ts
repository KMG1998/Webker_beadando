import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadRoutingModule } from './upload-routing.module';
import { UploadComponent } from './upload.component';
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MenuComponent} from "../../shared/components/menu/menu.component";


@NgModule({
  declarations: [
    UploadComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    UploadRoutingModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCheckboxModule,
  ]
})
export class UploadModule { }
