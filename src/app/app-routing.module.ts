import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common';

// Modulos
import { Routes, RouterModule } from '@angular/router';
import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';

// Componentes
import { NopagefoundComponent } from './nopagefound/nopagefound.component';

const routes: Routes = [      

  // path: '/dashboard' PagesRouting
  // path: '/progress' PagesRouting
  // path: '/grafica1' PagesRouting
  // path: '/login' AuthRouting
  // path: '/register' AuthRouting
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // ruta por defecto, al dashboard
  { path: '**', component: NopagefoundComponent }
]

@NgModule({
  imports: [
    //CommonModule (viene del ng g m appRouting --flat, y no es necesario)
    RouterModule.forRoot( routes ),
    PagesRoutingModule,   // Rutas de componentes de pages
    AuthRoutingModule     // Rutas de auth
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
