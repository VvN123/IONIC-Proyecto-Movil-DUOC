import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [


  {
    path: 'landing',
    loadChildren: () => import('./landing/landing.module').then( m => m.LandingPageModule)
  },
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home-alumno',
    loadChildren: () => import('./home-alumno/home-alumno.module').then( m => m.HomeAlumnoPageModule)
  },
  {
    path: 'home-profesor',
    loadChildren: () => import('./home-profesor/home-profesor.module').then( m => m.HomeProfesorPageModule)
  },
  {
    path: 'generatedqr',
    loadChildren: () => import('./generatedqr/generatedqr.module').then( m => m.GeneratedqrPageModule)
  },
  {
    path: 'clase-detalle',
    loadChildren: () => import('./clase-detalle/clase-detalle.module').then( m => m.ClaseDetallePageModule)
  },
  {
    path: 'detalle-asistencia/:uuid', // Aquí usamos un parámetro dinámico para el UUID
    loadChildren: () => import('./detalle-asistencia/detalle-asistencia.module').then(m => m.DetalleAsistenciaPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
