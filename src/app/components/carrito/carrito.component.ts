import { Component } from '@angular/core';
import { ApiRestService } from '../../services/api-rest.service';
import { CommonModule } from '@angular/common';
import { Carrito } from '../../interfaces/carrito';

@Component({
  selector: 'app-carrito',
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent {
  carrito: any;
  
  constructor(private ApiRestService: ApiRestService) {
  }

  ngOnInit() {
    const id_usuario = Number(localStorage.getItem('id_usuario'));

    this.ApiRestService.getCarrito( id_usuario ).subscribe({
      next: (response) => {
        console.log('✅ Carrito:', response);
        console.log(response.id_usuario);
        console.log(response.referencia_producto);
        console.log(response.cantidad);
        this.carrito = response;
      }
    });
  }
}
