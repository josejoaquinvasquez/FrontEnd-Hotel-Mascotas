import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from '@angular/forms';

//Rutas
import { AppRoutingModule } from './app-routing.module';

//Componentes
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { RegistroPersonaNaturalComponent } from './components/registro/registro-persona-natural/registro-persona-natural.component';
import { RegistroPersonaJuridicaComponent } from './components/registro/registro-persona-juridica/registro-persona-juridica.component';
import { SeleccionarPlanComponent } from './components/registro/seleccionar-plan/seleccionar-plan.component';
import { InformacionDuenioComponent } from './components/colegio/informacion-duenio/informacion-duenio.component';

//servicios
import { UsuarioService } from './services/usuario.service';
import { DominioService } from './services/dominio.service';
import { AuthenticationService } from './services/authentication.service';
import { DuenioColegioService } from './services/duenio-colegio.service';
import { MediaService } from './services/media.service';
import { DatosDuenioColegioComponent } from './components/colegio/datos-duenio-colegio/datos-duenio-colegio.component';
import { DatosMascotaComponent } from './components/cliente/datos-mascota/datos-mascota.component';
import { NombreDuenioMascotaPipe } from './pipes/nombre-duenio-mascota.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    RegistroPersonaNaturalComponent,
    RegistroPersonaJuridicaComponent,
    SeleccionarPlanComponent,
    InformacionDuenioComponent,
    DatosDuenioColegioComponent,
    DatosMascotaComponent,
    NombreDuenioMascotaPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ModalModule.forRoot()
  ],
  providers: [UsuarioService, DominioService, 
              AuthenticationService, DuenioColegioService,
              MediaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
