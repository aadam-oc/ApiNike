import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  email: string | undefined;
  id_usuario: number | undefined;


  ngOnInit(): void {
    this.email = localStorage.getItem('email') ?? undefined;
    this.id_usuario = Number(localStorage.getItem('id_usuario'));
    console.log('Email:', this.email);
    console.log('ID Usuario:', this.id_usuario);
  }
}
