import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './componentes/menu/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard.routing';

import { BuscarTipoEventoComponent } from './componentes/tipo-evento/buscar-tipo-evento/buscar-tipo-evento.component';

import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { GrowlModule } from 'primeng/growl';
import { DropdownModule } from 'primeng/dropdown';
import { MessagesModule } from 'primeng/messages';
import { KeyFilterModule } from 'primeng/keyfilter';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { InputMaskModule } from 'primeng/inputmask';


@NgModule({
  declarations: [
    MenuComponent,
    DashboardComponent,
    BuscarTipoEventoComponent
  ],
  imports: [
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    DashboardRoutingModule,
    MenubarModule,
    ButtonModule,
    ProgressSpinnerModule,
    TableModule,
    GrowlModule,
    DropdownModule,
    MessagesModule,
    KeyFilterModule,
    InputTextModule,
    DialogModule,
    InputMaskModule
  ],
  providers: []
})
export class DashboardModule { }
