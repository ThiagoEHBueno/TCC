import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TelaInicialComponent } from './components/tela-inicial/tela-inicial.component';
import { TelaDeLoginComponent } from './components/tela-de-login/tela-de-login.component';
import { CadastroProfessorComponent } from './components/cadastro-professor/cadastro-professor.component';
import { TelaProfessorComponent } from './components/tela-professor/tela-professor.component';
import { TurmasProfessorComponent } from './components/turmas-professor/turmas-professor.component';
import { FerramentaComponent } from './components/ferramenta/ferramenta.component';
import { TelaAlunoComponent } from './components/tela-aluno/tela-aluno.component';
import { JogoComponent } from './components/jogo/jogo.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { ListaDeJogosComponent } from './components/lista-de-jogos/lista-de-jogos.component';
import { ListaDeFerramentasComponent } from './components/lista-de-ferramentas/lista-de-ferramentas.component';
import { PerfilAlunoComponent } from './components/perfil-aluno/perfil-aluno.component';
import { JogoDaVelhaComponent } from './components/jogo-da-velha/jogo-da-velha.component';
import { ListaDeAtividadesComponent } from './components/lista-de-atividades/lista-de-atividades.component';
import { ListaDeAtividadesAlunosComponent } from './components/lista-de-atividades-alunos/lista-de-atividades-alunos.component';
import { AtividadeAlunoComponent } from './components/atividade-aluno/atividade-aluno.component';

@NgModule({
  declarations: [
    AppComponent,
    TelaInicialComponent,
    TelaDeLoginComponent,
    CadastroProfessorComponent,
    TelaProfessorComponent,
    TurmasProfessorComponent,
    TelaAlunoComponent,
    FerramentaComponent,
    JogoComponent,
    AppComponent,
    HeaderComponent,
    ListaDeJogosComponent,
    ListaDeFerramentasComponent,
    PerfilAlunoComponent,
    JogoDaVelhaComponent,
    ListaDeAtividadesComponent,
    ListaDeAtividadesAlunosComponent,
    AtividadeAlunoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
