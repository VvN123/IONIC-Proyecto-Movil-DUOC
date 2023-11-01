import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  private currentUUID: string = null;
  constructor() { }

  generateData(): { uuid: string, fecha: string } {
    const uuid = uuidv4();
    const fecha = this.getCurrentDateTime();

    return { uuid, fecha };
  }

  private getCurrentDateTime(): string {
    const date = new Date();

    // Configura el formato de fecha y hora como "DD/MM/YYYY H:mm"
    const day = this.padNumber(date.getDate());
    const month = this.padNumber(date.getMonth() + 1); // Los meses van de 0 a 11
    const year = date.getFullYear();
    const hours = this.padNumber(date.getHours());
    const minutes = this.padNumber(date.getMinutes());

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  private padNumber(num: number): string {
    // Si el número es menor a 10, antepone un '0'
    return num < 10 ? '0' + num : '' + num;
  }
  setUUID(uuid: string): void {
    this.currentUUID = uuid;
  }
  
  getUUID(): string {
    return this.currentUUID;
  }
}
