import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmtyPage } from './emty.page';
import {  ComponentsModule } from 'src/app/errors/component.module';

const routes: Routes = [
  {
    path: '',
    component: EmtyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),ComponentsModule],
  exports: [RouterModule],
})
export class EmtyPageRoutingModule {}
