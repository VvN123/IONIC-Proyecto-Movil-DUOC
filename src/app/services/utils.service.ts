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
    const day = this.padNumber(date.getDate());
    const month = this.padNumber(date.getMonth() + 1); 
    const year = date.getFullYear();
    const hours = this.padNumber(date.getHours());
    const minutes = this.padNumber(date.getMinutes());

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  private padNumber(num: number): string {
    return num < 10 ? '0' + num : '' + num;
  }
  setUUID(uuid: string): void {
    this.currentUUID = uuid;
  }
  
  getUUID(): string {
    return this.currentUUID;
  }
}
