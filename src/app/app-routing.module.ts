import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroProfessorComponent } from './components/cadastro-professor/cadastro-professor.component';
import { TelaDeLoginComponent } from './components/tela-de-login/tela-de-login.component';
import { TelaProfessorComponent } from './components/tela-professor/tela-professor.component';
import { TelaInicialComponent } from './components/tela-inicial/tela-inicial.component';
import { TurmasProfessorComponent } from './components/turmas-professor/turmas-professor.component';

const routes: Routes = [
  {path: '', redirectTo: 'tela-inicial', pathMatch: 'full'},
  {path:'tela-inicial', component: TelaInicialComponent},
  {path: 'cadastro-professor', component: CadastroProfessorComponent},
  {path: 'tela-de-login', component: TelaDeLoginComponent},
  {path: 'tela-professor', component: TelaProfessorComponent},
  {path: 'turmas-professor', component: TurmasProfessorComponent},
  {path: 'turmas-professor/:id', component: TurmasProfessorComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
