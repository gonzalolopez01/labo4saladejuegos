import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PuntajesService } from '../../services/puntajes.service';

@Component({
  selector: 'app-puntajes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './puntajes.component.html',
  styleUrl: './puntajes.component.css'
})
export class PuntajesComponent implements OnInit{

  puntajes: any[] = [];

  constructor(private puntajesService: PuntajesService) {}

  ngOnInit(): void {
    this.cargarPuntajes();
  }

  async cargarPuntajes() {
    this.puntajes = await this.puntajesService.obtenerPuntajesPorUsuarioYJuego();
  }
}
