import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  logIn(correo: string, contraseña: string): Observable<{isAuthenticated: boolean, isProfesor?: boolean}> { //Autentica usuarios
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

  logOut() {      //Elimina info de la sesion actuan del storage
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
  
  getUserNamesFromSubject(id: number): Observable<string[]> {  //Retorna los nombres de los usuarios en una asignatura segun la ID de asignatura
    return this.http.get<any[]>(`${this.apiUrl}/Clase?id=${id}`)
      .pipe(
        switchMap(clase => {
          if (clase && clase.length === 1) {
            let alumnosIds = clase[0].alumnos;
            return this.getUserById(alumnosIds);
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

  cerrarAsistencia(asistenciaId: number): Observable<any> {
    const url = `${this.apiUrl}/Asistencia/${asistenciaId}`;
    const body = { isCerrada: true };
    return this.http.put(url, body);
  }
}