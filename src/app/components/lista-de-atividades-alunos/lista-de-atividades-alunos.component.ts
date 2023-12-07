import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-de-atividades-alunos',
  templateUrl: './lista-de-atividades-alunos.component.html',
  styleUrls: ['./lista-de-atividades-alunos.component.css']
})
export class ListaDeAtividadesAlunosComponent implements OnInit {
  atividades: any[] = [];
  idTurmaDoAluno: string = '';
  atividadeSelecionada: any;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    const alunoUsuario = localStorage.getItem('user'); // Obtém o nome de usuário do aluno do localStorage

    if (alunoUsuario) {
      this.authService.obterAlunoPorUsuario(alunoUsuario).subscribe(
        (aluno) => {
          this.idTurmaDoAluno = aluno.id_turma; // Armazena a ID da turma do aluno
          console.log('Aluno:', aluno);
      
          if (this.idTurmaDoAluno) {
            this.authService.obterAtividadesPorTurma(this.idTurmaDoAluno).subscribe(
              (atividades) => {
                console.log('Atividades:', atividades); 
                this.atividades = atividades; // Armazena as atividades retornadas
              },
              (error) => {
                console.error('Erro ao obter atividades da turma:', error);
                // Lide com o erro conforme necessário
              }
            );
          } else {
            console.error('ID da turma do aluno não foi encontrada.');
            // Lide com a situação onde a ID da turma não foi encontrada
          }
        },
        (error) => {
          console.error('Erro ao obter dados do aluno:', error);
          // Lide com o erro conforme necessário
        }
      );
    } else {
      console.error('Nome de usuário do aluno não encontrado no localStorage.');
      // Lide com a situação onde o nome de usuário do aluno não está presente no localStorage
    }
  }
  selecionarAtividade(atividade: any) {
    this.atividadeSelecionada = atividade;
    this.router.navigate(['/atividade-aluno', atividade.id]);
  }
  
}
