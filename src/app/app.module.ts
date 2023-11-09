import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TelaInicialComponent } from './components/tela-inicial/tela-inicial.component';
import { TelaDeLoginComponent } from './components/tela-de-login/tela-de-login.component';
import { CadastroProfessorComponent } from './components/cadastro-professor/cadastro-professor.component';
import { CadastroAlunoComponent } from './components/cadastro-aluno/cadastro-aluno.component';
import { TelaProfessorComponent } from './components/tela-professor/tela-professor.component';

@NgModule({
  declarations: [
    AppComponent,
    TelaInicialComponent,
    TelaDeLoginComponent,
    CadastroProfessorComponent,
    CadastroAlunoComponent,
    TelaProfessorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
