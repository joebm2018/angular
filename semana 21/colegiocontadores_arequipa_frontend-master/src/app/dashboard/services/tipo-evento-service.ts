import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TipoEventoDto } from './../dominio/tipo-evento-dto';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


@Injectable()
export class TipoEventoService {
  data: any = null;
  // private direccionIp = '/';
  private direccionIp = "http://localhost:8080/";
  private url = this.direccionIp + 'Cursosccpaqp-ser/rest/cursos/';

  constructor(private http: HttpClient) {}

  obtenerTotalTipoEvento(): Observable<number> {
    return this.http.get(this.url + 'tipoEvento/obtenerTotalTipoEvento/')
                    .map((res: any) => res)
                    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  obtenerTodosTipoEvento(desde: number, hasta: number): Observable<TipoEventoDto[]> {
    // ...using get request
    return this.http.get(this.url + 'tipoEvento/obtenerTodos/' + desde + '/' + hasta)
      // ...and calling .json() on the response to return data
      .map((res: any) => res)
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }


  guardarTipoEvento(tipoEventoDto: TipoEventoDto): Observable<TipoEventoDto> {
    let body = JSON.stringify(tipoEventoDto);
    return this.http.post(this.url + 'tipoEvento/guardarTipoEvento/', body, httpOptions)
      .map((res: any) => res)
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    // .subscribe((res: Response) => console.log(res));
  }

}
