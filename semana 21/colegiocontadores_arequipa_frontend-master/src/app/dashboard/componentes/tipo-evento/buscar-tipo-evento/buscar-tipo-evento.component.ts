import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from './../../../../common/lazyloadevent';
import { TipoEventoDto } from './../../../dominio/tipo-evento-dto';

import { TipoEventoService } from './../../../services/tipo-evento-service';
import { Message } from 'primeng/components/common/api';

@Component({
  selector: 'app-buscar-tipo-evento',
  templateUrl: './buscar-tipo-evento.component.html',
  styleUrls: ['./buscar-tipo-evento.component.css'],
  providers: [TipoEventoService]
})
export class BuscarTipoEventoComponent implements OnInit {

  blockSpecial: RegExp = /^[^<>*!+|¬"#$/&()=?'¡¿´¨{}[]+$/;
  colsTipoEvento: any[];
  msgs: Message[] = [];
  msgsBusqueda: Message[] = [];
  loading: boolean = true;
  totalRecordsTipoEvento: number = 0;
  datasourceTipoEvento: PrimeTipoEventoDto[];
  tipoEventoDtos: TipoEventoDto[];
  displayNuevaTipoEvento: boolean = false;
  nuevoDocumento: boolean;
  tipoFiltroSelected: TipoFiltro;
  tipoFiltro: TipoFiltro[];
  ProgressSpinnerDlg : boolean = false;
  tipoEventoDto : TipoEventoDto = new PrimeTipoEventoDto(0,"","");

  constructor(private tipoEventoService: TipoEventoService) { }
  ngOnInit() {
    this.tipoFiltro = [
      { nombre: 'Codigo', code: 1 },
      { nombre: 'Nombre', code: 2 }
    ];
    this.tipoFiltroSelected = this.tipoFiltro[0];
    this.colsTipoEvento = [
      { field: 'codigo', header: 'Codigo', width: '20%' },
      { field: 'nombre', header: 'Nombre', width: '80%' }
    ];
    setTimeout(() => {
      this.loading = false;
      // this.displayLeave = false;
      // this.obtenerTodosDocumentos();
    })
  }

  buscarTipoEvento() {
    this.loading = true;
    this.tipoEventoService.obtenerTotalTipoEvento()
    .subscribe(
      p => {
        if(p > 0){
          this.totalRecordsTipoEvento = p;
          this.consultaDBobtenerbuscarTipoEvento(0,10);
        }else{
          this.totalRecordsTipoEvento = 0;
          this.msgsBusqueda = [];
          this.msgsBusqueda.push({ severity: 'warn', summary: 'AVISO:', detail: 'No hay resultados para busqueda'});
        }
      }, //Bind to view
      err => {
        // Log errors if any
        this.msgsBusqueda = [];
        this.msgsBusqueda.push({ severity: 'error', summary: 'ERROR:', detail: 'Ocurrio un error' });
        console.log(err);
      });
    this.loading = false;
  }

  consultaDBobtenerbuscarTipoEvento(desde: number, hasta: number){
    this.tipoEventoService.obtenerTodosTipoEvento(desde, hasta)
    .subscribe(
      p => {
        this.tipoEventoDtos = p;
        this.datasourceTipoEvento = p;
      }, //Bind to view
      err => {
        // Log errors if any
        this.msgsBusqueda = [];
        this.msgsBusqueda.push({ severity: 'error', summary: 'ERROR:', detail: 'Ocurrio un error' });
        console.log(err);
      });
  }

  guardarTipoEvento() {
    this.displayNuevaTipoEvento = false;
    this.loading = true;
    // let latest_date = this.datepipe.transform(this.fechaDocumento, 'dd/MM/yyyy');
    this.tipoEventoDto.codigo = this.tipoEventoDto.codigo.toUpperCase().trim();
    this.tipoEventoDto.nombre = this.tipoEventoDto.nombre.toUpperCase().trim();
    this.tipoEventoService.guardarTipoEvento(this.tipoEventoDto)
      .subscribe(
        p => {
          this.tipoEventoDto = p;
          this.msgs = [];
          this.msgs.push({ severity: 'success', summary: 'AVISO:', detail: 'Se guardó el tipo evento '});
        }, //Bind to view
        err => {
          // Log errors if any
          this.msgs = [];
          this.msgs.push({ severity: 'error', summary: 'ERROR:', detail: 'Ocurrio un error' });
          console.log(err);
          this.displayNuevaTipoEvento = false;
          return;
        });
    this.loading = false;
  }


  agregarTipoEvento(){
    this.tipoEventoDto = new PrimeTipoEventoDto(0,"","");
    this.displayNuevaTipoEvento = true;
  }

  cerrarDisplayTipoEvento(){
    this.displayNuevaTipoEvento = false;
  }



  loadLeaveLazyTipoEvento(event: LazyLoadEvent) {
    this.loading = true;
    setTimeout(() => {
      if (this.datasourceTipoEvento) {
        this.consultaDBobtenerbuscarTipoEvento(event.first, event.rows);
        this.loading = false;
      } else { this.loading = false; }
    }, 1000);
  }
}

interface TipoFiltro {
  nombre: string;
  code: number;
}

export class PrimeTipoEventoDto implements TipoEventoDto {
  constructor(public id:number, public codigo: string, public nombre: string) { }
}
