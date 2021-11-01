import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface Evento {
  eventoId: number;
  local: string;
  dataEvento: Date;
  tema: string;
  qtdPessoas: number;
  lote: string;
  imagemURL: string;
}
@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css'],
})
export class EventosComponent implements OnInit {
  private _filtroLista: string = '';
  public eventos: Evento[] = [];
  public imagemLargura = 50;
  public imagemMargem = 2;
  public mostrarImagem = false;
  public eventosFiltrados: any = [];

  public get filtroLista(): string {
    return this._filtroLista;
  }
  public set filtroLista(value: string) {
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista
      ? this.filtrarEvento(this.filtroLista)
      : this.eventos;
  }

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getEventos();
  }

  private filtrarEvento(filtroLista: string): any {
    filtroLista = filtroLista.toLocaleLowerCase();
    return this.eventos.filter(
      (evento: Evento) =>
        evento.tema.toLocaleLowerCase().indexOf(filtroLista) !== -1
    );
  }

  public alternarImagem() {
    this.mostrarImagem = !this.mostrarImagem;
  }

  public getEventos() {
    this.http.get<Evento[]>('http://localhost:5000/api/values').subscribe(
      (response) => {
        this.eventos = response;
      },
      (error) => console.error(error)
    );
  }
}
