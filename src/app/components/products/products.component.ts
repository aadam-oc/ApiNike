import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiRestService } from '../../services/api-rest.service';

@Component({
  selector: 'app-products',
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  productos: any[] = [];

  constructor(private apiService: ApiRestService) {}

  ngOnInit(): void {
    this.apiService.getProductos().subscribe(data => {
      this.productos = data; 

    }, error => {
      console.error('Error al obtener productos:', error);
    });
    
    
  }

  
}