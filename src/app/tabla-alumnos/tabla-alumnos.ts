import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

interface Estudiante {
  id: number;
  nombre: string;
  correo: string;
  fechaNacimiento: Date;
  carrera: string;
}
@Component({
  selector: 'app-tabla-alumnos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tabla-alumnos.html',
  styleUrl: './tabla-alumnos.css',
})
export class TablaAlumnos {
  estudiantes: Estudiante[] = [
    {
      id: 1,
      nombre: 'Carlos Rodríguez',
      correo: 'carlos@example.com',
      fechaNacimiento: new Date('2000-05-10'),
      carrera: 'Ingeniería de Sistemas',
    },
    {
      id: 2,
      nombre: 'Laura Martínez',
      correo: 'laura@example.com',
      fechaNacimiento: new Date('1999-08-15'),
      carrera: 'Administración de Empresas',
    },
  ];

  addEstudiante = false;
  estudianteForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.estudianteForm = this.fb.group({
      nombre: [''],
      correo: [''],
      fechaNacimiento: [''],
      carrera: [''],
    });
  }

  toggleFormularioEstudiante() {
    this.addEstudiante = !this.addEstudiante;
  }

  agregarEstudiante() {
    if (this.estudianteForm.valid) {
      const nuevoEstudiante: Estudiante = {
        id: this.estudiantes.reduce((max, e) => Math.max(max, e.id), 0) + 1,
        ...this.estudianteForm.value,
        fechaNacimiento: new Date(this.estudianteForm.value.fechaNacimiento),
      };
      this.estudiantes.push(nuevoEstudiante);
      this.estudianteForm.reset();
      this.addEstudiante = false;
    }
  }

  editarEstudiante(id: number) {
    const estudiante = this.estudiantes.find((e) => e.id === id);
    if (estudiante) {
      this.estudianteForm.patchValue({
        nombre: estudiante.nombre,
        correo: estudiante.correo,
        fechaNacimiento: estudiante.fechaNacimiento.toISOString().split('T')[0],
        carrera: estudiante.carrera,
      });
      this.addEstudiante = true;
      this.eliminarEstudiante(id);
    }
  }

  eliminarEstudiante(id: number) {
    this.estudiantes = this.estudiantes.filter((e) => e.id !== id);
  }
}
