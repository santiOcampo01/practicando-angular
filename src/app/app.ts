import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import {TablaAlumnos} from './tabla-alumnos/tabla-alumnos';
import { TablaCursos } from './tabla-cursos/tabla-cursos';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TablaAlumnos, TablaCursos, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  cursos: boolean = true;
  handleChange() {
    this.cursos = !this.cursos;
    console.log(this.cursos);
  }
}
