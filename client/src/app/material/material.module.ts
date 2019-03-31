// material.module.ts

import { NgModule } from '@angular/core';

// import angular material modules

import {MatTabsModule} from '@angular/material/tabs';


@NgModule({
  imports: [
    MatTabsModule
  ],
  exports: [
    MatTabsModule
  ]
})

export class MaterialModule {}
