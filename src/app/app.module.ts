import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TelaInicialComponent } from './components/tela-inicial/tela-inicial.component';
import { TelaDeLoginComponent } from './components/tela-de-login/tela-de-login.component';
import { CadastroProfessorComponent } from './components/cadastro-professor/cadastro-professor.component';
import { CadastroAlunoComponent } from './components/cadastro-aluno/cadastro-aluno.component';
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


@NgModule({
  declarations: [
    AppComponent,
    TelaInicialComponent,
    TelaDeLoginComponent,
    CadastroProfessorComponent,
    CadastroAlunoComponent,
    TelaProfessorComponent,
    TurmasProfessorComponent,
    TelaAlunoComponent,
    FerramentaComponent,
    JogoComponent,
    AppComponent,
    
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
