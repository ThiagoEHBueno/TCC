import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroProfessorComponent } from './components/cadastro-professor/cadastro-professor.component';
import { TelaDeLoginComponent } from './components/tela-de-login/tela-de-login.component';
import { TelaProfessorComponent } from './components/tela-professor/tela-professor.component';
import { TelaInicialComponent } from './components/tela-inicial/tela-inicial.component';
import { TurmasProfessorComponent } from './components/turmas-professor/turmas-professor.component';
import { TelaAlunoComponent } from './components/tela-aluno/tela-aluno.component';
import { FerramentaComponent } from './components/ferramenta/ferramenta.component';
import { JogoComponent } from './components/jogo/jogo.component';
import { ListaDeJogosComponent } from './components/lista-de-jogos/lista-de-jogos.component';
import { ListaDeFerramentasComponent } from './components/lista-de-ferramentas/lista-de-ferramentas.component';
import { PerfilAlunoComponent } from './components/perfil-aluno/perfil-aluno.component';
import { JogoDaVelhaComponent } from './components/jogo-da-velha/jogo-da-velha.component';
import { ListaDeAtividadesComponent } from './components/lista-de-atividades/lista-de-atividades.component';
import { ListaDeAtividadesAlunosComponent } from './components/lista-de-atividades-alunos/lista-de-atividades-alunos.component';
import { AtividadeAlunoComponent } from './components/atividade-aluno/atividade-aluno.component';

const routes: Routes = [
  {path: '', redirectTo: 'tela-inicial', pathMatch: 'full'},
  {path:'tela-inicial', component: TelaInicialComponent},
  {path: 'cadastro-professor', component: CadastroProfessorComponent},
  {path: 'tela-de-login', component: TelaDeLoginComponent},
  {path: 'tela-professor', component: TelaProfessorComponent},
  {path: 'turmas-professor', component: TurmasProfessorComponent},
  {path: 'turmas-professor/:id', component: TurmasProfessorComponent },
  {path: 'tela-aluno', component: TelaAlunoComponent },
  {path: 'ferramenta', component: FerramentaComponent },
  {path: 'jogo', component: JogoComponent },
  {path: 'lista-de-jogos', component: ListaDeJogosComponent },
  {path: 'lista-de-ferramentas', component: ListaDeFerramentasComponent },
  {path: 'perfil-aluno', component: PerfilAlunoComponent },
  {path: 'jogo-da-velha', component: JogoDaVelhaComponent },
  {path: 'lista-de-atividades', component: ListaDeAtividadesComponent },
  {path: 'lista-de-atividades-alunos', component: ListaDeAtividadesAlunosComponent },
  {path: 'atividade-aluno/:id', component: AtividadeAlunoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
