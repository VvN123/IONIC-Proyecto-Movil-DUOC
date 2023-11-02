import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  authenticate(correo: string, contraseña: string): Observable<{isAuthenticated: boolean, isProfesor?: boolean}> {
    return this.http.get<any[]>(`${this.apiUrl}/Usuario?correo=${correo}&contraseña=${contraseña}`)
      .pipe(
        map(users => {
          if (users && users.length === 1) {
            localStorage.setItem('currentUser', JSON.stringify(users[0]));
            return { isAuthenticated: true, isProfesor: users[0].isProfesor };
          } else {
            return { isAuthenticated: false };
          }
        })
      );
  }

  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Usuario`);
  }
  
  getClases(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Clase`);
  }

  addAsistencia(data): Observable<any> {
    return this.http.post(`${this.apiUrl}/Asistencia`, data);
  }
  

  logout() {
    localStorage.removeItem('currentUser');
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  getClaseById(id: number): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/Clase?id=${id}`)
      .pipe(
        map(clases => {
          if (clases && clases.length === 1) {
            return {
              nombre: clases[0].nombre,
              codigo: clases[0].codigo
            };
          } else {
            throw new Error('Clase no encontrada o hay múltiples coincidencias'); 
          }
        })
      );
  }
  
  getNombresAlumnosByClaseId(id: number): Observable<string[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Clase?id=${id}`)
      .pipe(
        switchMap(clase => {
          if (clase && clase.length === 1) {
            let alumnosIds = clase[0].alumnos;
            return this.getNombresUsuariosByIds(alumnosIds);
          } else {
            throw new Error('Clase no encontrada o hay múltiples coincidencias');
          }
        })
      );
  }
  
  getNombresUsuariosByIds(ids: number[]): Observable<string[]> {
    return this.getUsuarios()
      .pipe(
        map(usuarios => {
          return usuarios
            .filter(usuario => ids.includes(usuario.id) && !usuario.isProfesor)
            .map(alumno => `${alumno.nombre} ${alumno.apellido}`);
        })
      );
  }

  getDetallesAlumnosByClaseId(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Clase?id=${id}`)
      .pipe(
        switchMap(clase => {
          if (clase && clase.length === 1) {
            let alumnosIds = clase[0].alumnos;
            return this.getDetallesUsuariosByIds(alumnosIds);
          } else {
            throw new Error('Clase no encontrada o hay múltiples coincidencias');
          }
        })
      );
  }
  
  getDetallesUsuariosByIds(ids: number[]): Observable<any[]> {
    return this.getUsuarios()
      .pipe(
        map(usuarios => {
          return usuarios
            .filter(usuario => ids.includes(usuario.id) && !usuario.isProfesor);
        })
      );
  }

  getAsistenciasPorIdClase(idClase: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Asistencia?idClase=${idClase}`)
      .pipe(
        map(asistencias => {
          return asistencias.filter(asistencia => asistencia.idClase === idClase);
        })
      );
  }

  getAsistenciaByUuid(uuid: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/Asistencia?uuid=${uuid}`)
      .pipe(
        map(asistencias => {
          const asistencia = asistencias.find(asis => asis.uuid === uuid);
          console.log("flag"+asistencia)
          if (asistencia) {
            return asistencia;
          } else {
            console.log("flag error")
            throw new Error('Asistencia no encontrada');
          }
        })
      );
  }

  getAlumnosByAsistenciaUuid(uuid: string): Observable<any[]> {
    return this.getAsistenciaByUuid(uuid).pipe(
      switchMap(asistencia => {
        if (!asistencia) {
          throw new Error('Asistencia no encontrada');
        }
        return this.getDetallesUsuariosByIds(asistencia.alumnos);
      })
    );
  }

  cerrarAsistencia(asistenciaId: number): Observable<any> {
    const url = `${this.apiUrl}/Asistencia/${asistenciaId}`;
    const body = { isCerrada: true };
    return this.http.put(url, body);
  }
}