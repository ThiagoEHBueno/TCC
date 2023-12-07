import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-lista-de-atividades',
  templateUrl: './lista-de-atividades.component.html',
  styleUrls: ['./lista-de-atividades.component.css']
})
export class ListaDeAtividadesComponent implements OnInit {
  alunosComTurma: any[] = [];
  tituloAtividade: string = '';
  idTurmaSelecionada: number = 0;
  turmas: { id: number, nome: string }[] = [];
  perguntas: { enunciado: string, opcoes: string[] }[] = [{ enunciado: '', opcoes: ['', '', '', ''] }];


  constructor(private authService: AuthService) { }

  ngOnInit() {
    const emailProfessor = localStorage.getItem('userEmail');
    console.log('Valor de emailProfessor:', emailProfessor);
    if (emailProfessor) {
      this.authService.obterAlunosComTurma(emailProfessor).subscribe(
        (alunos) => {
          this.alunosComTurma = alunos;
          console.log('Alunos com informações de turma:', this.alunosComTurma);
          
          const turmasNomes = this.alunosComTurma.map((aluno) => aluno.nome_turma);
          const turmasId = this.alunosComTurma.map((aluno) => aluno.id_turma);
          console.log('id', turmasId)
      
          this.turmas = this.alunosComTurma.map((aluno) => ({ id: aluno.id_turma, nome: aluno.nome_turma }));

        },
        (error) => {
          console.error('Erro ao buscar alunos com turma:', error);
        }
      );
    }
  }

  selecionarTurma(event: Event) {
    const target = event.target as HTMLSelectElement;
    const selectedTurmaId = target.value;

    if (selectedTurmaId !== '') {
        this.idTurmaSelecionada = parseInt(selectedTurmaId, 10); // Converter para número, se necessário
        console.log('ID da turma selecionada:', this.idTurmaSelecionada);
        // Faça o que precisar com o ID da turma selecionada
    } else {
        console.log('Nenhuma turma selecionada');
    }
}


enviarAtividade() {
  const atividade = {
    titulo: this.tituloAtividade,
    idTurma: this.idTurmaSelecionada,
    perguntas: this.perguntas.filter(pergunta => pergunta.enunciado.trim() !== '' && pergunta.opcoes.every(opcao => opcao.trim() !== ''))
  };
  console.log(atividade);

  if (atividade.perguntas.length === 0) {
    console.log('Nenhuma pergunta adicionada.');
    return; // Se não houver perguntas válidas, não envie a atividade
  }

  this.authService.enviarAtividade(atividade).subscribe(
    (data) => {
      console.log('Atividade enviada com sucesso:', data);
      // Realizar ações após o envio bem-sucedido, se necessário
    },
    (error) => {
      console.error('Erro ao enviar atividade:', error);
      // Lidar com o erro, se necessário
    }
  );
}
  
  adicionarPergunta() {
    this.perguntas.push({ enunciado: '', opcoes: ['', '', '', ''] });
  }
}  