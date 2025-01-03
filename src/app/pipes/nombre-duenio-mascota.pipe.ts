import { Pipe, PipeTransform } from '@angular/core';
import { DuenioMascota } from '../modelos/DuenioMascota.model';

@Pipe({
  name: 'nombreDuenioMascota'
})
export class NombreDuenioMascotaPipe implements PipeTransform {

  transform(value: DuenioMascota[], filter: string): DuenioMascota[] {
    if(filter === '' || filter === undefined) {
      return value;
    }

    if (value.length === 0) {
      return value;
    }


      return value.filter((value: DuenioMascota) : DuenioMascota | void  => {
      const nombre =
        value.nombre.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
      const apellido =
        value.apellido.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
      const noContacto =
        value.noContacto.toLowerCase().indexOf(filter.toLowerCase()) !== -1;

      if (nombre || apellido || noContacto) {
        return value;
      }
    });
  }

}
