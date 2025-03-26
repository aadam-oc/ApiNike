import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiRestService } from '../../services/api-rest.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule, CommonModule],
  standalone: true,
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {

  imagenUrl: string = '';
  imagenSeleccionada: boolean = false;
  existe: boolean = false;

  constructor(private apiRestService: ApiRestService) { }

  FormularioProducto = new FormGroup({
    Referencia: new FormControl('', [Validators.required, Validators.min(1), Validators.max(100)]),
    Nombre: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
    Precio: new FormControl('', [Validators.required, Validators.min(0)]),
    Descripcion: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(300)]),
    TipoProducto: new FormControl('', [Validators.required]),
    EnOferta: new FormControl(false)
  });

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      this.imagenSeleccionada = true;

      this.apiRestService.subirImagen(file).subscribe(response => {
        this.imagenUrl = response.imageUrl;
        this.imagenSeleccionada = false;
      });
    }
  }

  ExisteProducto(): void {

    const existe = this.apiRestService.productoExistente(this.FormularioProducto.value.Referencia as string);
    if (existe) {
      this.existe = true;
      this.apiRestService.getProductoReferencia(this.FormularioProducto.value.Referencia as string).subscribe(producto => {
        this.FormularioProducto.patchValue({
          Referencia: producto.Referencia,
          Nombre: producto.Nombre,
          Precio: producto.Precio,
          Descripcion: producto.Descripcion,
          TipoProducto: producto.TipoProducto,
          EnOferta: producto.EnOferta
        });
      });
      
    }
    else {
      this.existe = false;
    }
  }

  onSubmit() {
    //console.log(this.FormularioProducto.value);

    if (this.FormularioProducto.valid) {
      const producto = {
        Referencia: this.FormularioProducto.value.Referencia,
        Nombre: this.FormularioProducto.value.Nombre,
        Precio: this.FormularioProducto.value.Precio,
        Descripcion: this.FormularioProducto.value.Descripcion,
        TipoProducto: this.FormularioProducto.value.TipoProducto,
        EnOferta: this.FormularioProducto.value.EnOferta,
        imagen: this.imagenUrl
      }
      this.apiRestService.añadirProducto(producto);
    } else {
      alert('Error al añadir el producto');

    }
  }
}

