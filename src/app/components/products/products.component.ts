import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiRestService } from '../../services/api-rest.service';
import { stringify } from 'querystring';
import { RouterLink } from '@angular/router';
import { isSet } from 'util/types';


@Component({
  selector: 'app-products',
  imports: [CommonModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  productos: any[] = [];
  rol: any = '';

  constructor(private apiService: ApiRestService) { }

  eliminarProducto(referencia: string): void {
    this.apiService.eliminarProducto(referencia).subscribe(() => {
      this.productos = this.productos.filter(producto => producto.referencia !== referencia);
    })
  };

  anadirAlCarrito(referencia: string): void {
    localStorage.setItem('id_usuario', '1');
    const id_usuario = Number(localStorage.getItem('id_usuario')) || '';
    const infoCarrito = {
      referencia: referencia,
      id_usuario: id_usuario
    };
    this.apiService.anadirAlCarrito(infoCarrito).subscribe(() => {
      console.log('Producto añadido al carrito');
    });
  }


  ngOnInit(): void {
    if (localStorage.getItem('rol') !== null && localStorage.getItem('rol') !== undefined) {
          this.rol = localStorage.getItem('rol');
          
        }
  
    this.apiService.getProductos().subscribe(data => {
      this.productos = data;

    }, error => {
      console.error('Error al obtener productos:', error);
    });


  }


}