import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, mergeMap, switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  logIn(correo: string, contraseña: string): Observable<{isAuthenticated: boolean, isProfesor?: boolean}> { // Autentica al usuario y crea un elemento currentuser que guarda la sesion del usuario sin password
    return this.http.get<any[]>(`${this.apiUrl}/Usuario?correo=${correo}&contraseña=${contraseña}`)
      .pipe(
        map(users => {
          if (users && users.length === 1) {
            const user = users[0];
            const { contraseña, ...userWithoutPassword } = user; 
            localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
            console.log(JSON.parse(localStorage.getItem('currentUser')))
            return { isAuthenticated: true, isProfesor: user.isProfesor };
          } else {
            return { isAuthenticated: false };
          }
        })
      );
  }

  logOut() {  //Elimina info de la sesion actuan del storage
    localStorage.removeItem('currentUser');
  }

  getUsers(): Observable<any[]> {  //Retorna a todos los usuarios
    return this.http.get<any[]>(`${this.apiUrl}/Usuario`);
  }
  
  getSubjects(): Observable<any[]> {  //Retorna todas las asignaturas
    return this.http.get<any[]>(`${this.apiUrl}/Clase`);
  }

  addAttendance(data): Observable<any> {  //Crea un evento de asistencia
    return this.http.post(`${this.apiUrl}/Asistencia`, data);
  }
  
  getCurrentUser() {  //Retorna la informacion del usuario logeado actualmente
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  getSubjectById(id: number): Observable<any> {  //Retorna una asignatura segund su ID
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
  
  getUserById(ids: number[]): Observable<string[]> {  //Retorna una lista de nombres y appellidos de usuarios Almunos segun una lista de ID de usuario 
    return this.getUsers()
      .pipe(
        map(usuarios => {
          return usuarios
            .filter(usuario => ids.includes(usuario.id) && !usuario.isProfesor)
            .map(alumno => `${alumno.nombre} ${alumno.apellido}`);
        })
      );
  }

  getUserDataFromSubject(id: number): Observable<any[]> {  // Retorna la informacion de un usuario segun su ID
    return this.http.get<any[]>(`${this.apiUrl}/Clase?id=${id}`)
      .pipe(
        switchMap(clase => {
          if (clase && clase.length === 1) {
            let alumnosIds = clase[0].alumnos;
            return this.getUserDataById(alumnosIds);
          } else {
            throw new Error('Clase no encontrada o hay múltiples coincidencias');
          }
        })
      );
  }
  
  getUserDataById(ids: number[]): Observable<any[]> {  //Retorna una lista de usuarios alumnos segun su Id
    return this.getUsers()
      .pipe(
        map(usuarios => {
          return usuarios
            .filter(usuario => ids.includes(usuario.id) && !usuario.isProfesor);
        })
      );
  }

  getAttendanceUsersFromSubject(idClase: number): Observable<any[]> {  //Retorna todos los eventos de asistencia de una asignatura segun su ID de clase
    return this.http.get<any[]>(`${this.apiUrl}/Asistencia?idClase=${idClase}`)
      .pipe(
        map(asistencias => {
          return asistencias.filter(asistencia => asistencia.idClase === idClase);
        })
      );
  }

  getAttendanceDataByUuid(uuid: string): Observable<any> { //Retorna la lista de asistencia de un evento de asistencia segun su UUID
    return this.http.get<any[]>(`${this.apiUrl}/Asistencia?uuid=${uuid}`)
      .pipe(
        map(asistencias => {
          const asistencia = asistencias.find(asis => asis.uuid === uuid);
          if (asistencia) {
            return asistencia;
          } else {

            throw new Error('Asistencia no encontrada');
          }
        })
      );
  }

  getUserAttendanceDataByUuid(uuid: string): Observable<any[]> { //Retorna la informacion de los alumnos que asitieron a un determinado evento de asistencia segun su UUID
    return this.getAttendanceDataByUuid(uuid).pipe(
      switchMap(asistencia => {
        if (!asistencia) {
          throw new Error('Asistencia no encontrada');
        }
        return this.getUserDataById(asistencia.alumnos);
      })
    );
  }

  cerrarAsistencia(asistenciaUuid: string): Observable<any> { // Cierra un evento de asistencia segun su UUID
    return this.http.get<any[]>(`${this.apiUrl}/Asistencia?uuid=${asistenciaUuid}`).pipe(
      mergeMap(asistencias => {
        if (asistencias.length === 0) {
          return throwError(() => new Error('Record not found'));
        }
        const asistencia = asistencias[0];
        return this.http.patch(`${this.apiUrl}/Asistencia/${asistencia.id}`, { isCerrada: true });
      }),
      catchError(error => {
        console.error('Error al cerrar la asistencia:', error);
        return throwError(() => error);
      })
    );
  }
}
  
  