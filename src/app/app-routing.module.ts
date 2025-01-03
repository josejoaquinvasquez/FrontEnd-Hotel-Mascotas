import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent} from './components/home/home.component';
import { RegistroPersonaNaturalComponent } from './components/registro/registro-persona-natural/registro-persona-natural.component';
import { RegistroPersonaJuridicaComponent } from './components/registro/registro-persona-juridica/registro-persona-juridica.component';
import { InformacionDuenioComponent } from './components/colegio/informacion-duenio/informacion-duenio.component';
import { SeleccionarPlanComponent} from './components/registro/seleccionar-plan/seleccionar-plan.component';
import { DatosDuenioColegioComponent } from './components/colegio/datos-duenio-colegio/datos-duenio-colegio.component';
import { DatosMascotaComponent } from './components/cliente/datos-mascota/datos-mascota.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'registro-persona-natural', component: RegistroPersonaNaturalComponent},
  { path: 'registro-persona-juridica', component: RegistroPersonaJuridicaComponent},
  { path: 'informacion-colegio', component: InformacionDuenioComponent},
  { path: 'seleccionar-plan', component: SeleccionarPlanComponent},
  { path: 'duenio-colegio', component: DatosDuenioColegioComponent},
  { path: 'cliente-colegio', component: DatosMascotaComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash:true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
