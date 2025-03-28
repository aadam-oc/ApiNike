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
    const id = Number(localStorage.getItem('id'));

    this.ApiRestService.getCarrito( id ).subscribe({
      next: (response) => {
        console.log('✅ Carrito:', response);
        console.log(response.id);
        console.log(response.referencia_producto);
        console.log(response.cantidad);
        this.carrito = response;
      }
    });
  }
}
