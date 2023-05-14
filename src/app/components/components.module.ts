import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms'; // hace que funcione [(ngModule)] en inputs

import { ChartsModule } from 'ng2-charts';

import { IncrementadorComponent } from './incrementador/incrementador.component';
import { DoughnutComponent } from './doughnut/doughnut.component';
import { ModalImagenComponent } from './modal-imagen/modal-imagen.component';



@NgModule({
  declarations: [
    IncrementadorComponent,
    DoughnutComponent,
    ModalImagenComponent
  ],
  exports: [
    IncrementadorComponent,
    DoughnutComponent,
    ModalImagenComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule
  ]
})
export class ComponentsModule { }
