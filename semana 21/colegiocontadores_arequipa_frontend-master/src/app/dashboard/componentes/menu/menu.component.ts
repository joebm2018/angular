import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  items: MenuItem[];


  constructor() { }

  ngOnInit() {
    this.items = [
      {
        label: 'Administracion',
        icon: 'fa fa-cogs',
        items: [
          // { label: 'Detalle', icon: 'fa fa-asterisk', routerLink: ['/dashboard', { outlets: { 'principal': ['documento-detalle'] } }] },
          { label: 'Tipo Evento', icon: 'fa fa-cube', routerLink: ['/dashboard', { outlets: { 'principal': ['tipo-evento'] } }] },
          { separator: true },
          { label: 'Salir', icon: 'fa fa-sign-out'}
        ]
      }
    ];
  }

}
