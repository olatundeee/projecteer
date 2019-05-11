// material.module.ts

import { NgModule } from '@angular/core';

// import angular material modules

import {MatTabsModule} from '@angular/material/tabs';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  imports: [
    MatTabsModule,
    MatDialogModule
  ],
  exports: [
    MatTabsModule,
    MatDialogModule
  ]
})

export class MaterialModule {}
