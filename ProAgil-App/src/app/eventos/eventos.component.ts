import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Evento } from '../models/evento';
import { EventosService } from './eventos.service';

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
  public eventosFiltrados: Evento[] = [];
  public modalRef: BsModalRef;

  public get filtroLista(): string {
    return this._filtroLista;
  }
  public set filtroLista(value: string) {
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista
      ? this.filtrarEvento(this.filtroLista)
      : this.eventos;
  }

  constructor(
    private eventoService: EventosService,
    private modalService: BsModalService
  ) {}

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

  public openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }

  public getEventos(): void {
    this.eventoService.getAllEventos().subscribe(
      (response: Evento[]) => {
        this.eventos = response;
        this.eventosFiltrados = this.eventos;
      },
      (error) => console.error(error)
    );
  }
}
