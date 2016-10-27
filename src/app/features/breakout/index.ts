import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './breakout.routing';

import { BreakoutComponent } from './breakout.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    BreakoutComponent
  ]
})

export class BreakoutModule {}

