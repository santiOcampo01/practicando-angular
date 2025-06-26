import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

interface Cursos {
  id: number;
  nombre: string;
  descripcion: string;
  fechaInicio: Date;
  fechaFin: Date;
  profesor: string;
}

@Component({
  selector: 'app-tabla-cursos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tabla-cursos.html',
  styleUrl: './tabla-cursos.css',
})
export class TablaCursos {
  cursos: Cursos[] = [
    {
      id: 1,
      nombre: 'Curso de Angular',
      descripcion: 'Aprende Angular desde cero',
      fechaInicio: new Date('2023-01-01'),
      fechaFin: new Date('2023-06-01'),
      profesor: 'Juan Pérez',
    },
    {
      id: 2,
      nombre: 'Curso de React',
      descripcion: 'Aprende React desde cero',
      fechaInicio: new Date('2023-02-01'),
      fechaFin: new Date('2023-07-01'),
      profesor: 'Ana Gómez',
    },
  ];

  addCurso = false;
  cursoForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.cursoForm = this.fb.group({
      nombre: [''],
      descripcion: [''],
      fechaInicio: [''],
      fechaFin: [''],
      profesor: [''],
    });
  }

  handleAgregarCurso() {
    this.addCurso = !this.addCurso;
  }

  agregarCurso() {
    if (this.cursoForm.valid) {
      const nuevoCurso: Cursos = {
        id: this.cursos.reduce((max, c) => Math.max(max, c.id), 0) + 1,
        ...this.cursoForm.value,
        fechaInicio: new Date(this.cursoForm.value.fechaInicio),
        fechaFin: new Date(this.cursoForm.value.fechaFin),
      };
      this.cursos.push(nuevoCurso);
      this.cursoForm.reset();
      this.addCurso = false;
    }
  }

  editarCurso(id: number) {
    const curso = this.cursos.find((c) => c.id === id);
    if (curso) {
      this.cursoForm.setValue({
        nombre: curso.nombre,
        descripcion: curso.descripcion,
        fechaInicio: curso.fechaInicio.toISOString().substring(0, 10),
        fechaFin: curso.fechaFin.toISOString().substring(0, 10),
        profesor: curso.profesor,
      });
      this.addCurso = true;
      this.cursos = this.cursos.filter((c) => c.id !== id);
    }
  }

  eliminarCurso(id: number) {
    this.cursos = this.cursos.filter((curso) => curso.id !== id);
  }
}
