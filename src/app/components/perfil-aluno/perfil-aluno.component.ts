import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-aluno',
  templateUrl: './perfil-aluno.component.html',
  styleUrls: ['./perfil-aluno.component.css']
})
export class PerfilAlunoComponent implements OnInit {
  nomeAluno: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    const usuarioAluno = localStorage.getItem('user');
    console.log('Valor de usuarioAluno:', usuarioAluno);
    if (usuarioAluno) {
      // Certifique-se de que não há espaços em branco no nome do usuário antes de passá-lo para a rota
      const nomeUsuarioSemEspacos = usuarioAluno.trim(); 
      this.obterInformacoesAlunoPorUsuario(nomeUsuarioSemEspacos);
    }
  }
  
  obterInformacoesAlunoPorUsuario(usuario: string) {
    this.authService.obterAlunoPorUsuario(usuario).subscribe(
      (data) => {
        
        // pega os dados do aluno
        this.nomeAluno = data.nome;
      },
      (error) => {
        console.error('Erro ao obter informações do aluno:', error);
      }
    );
  }
  sair() {
    // Limpar os dados do armazenamento local ao clicar em "Sair"
    localStorage.removeItem('user'); // Remover o item 'user'

    // Redirecionar para a tela de login
    this.router.navigate(['/tela-de-login']);
  }
}
