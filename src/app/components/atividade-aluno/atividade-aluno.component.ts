import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, observable } from 'rxjs';

@Component({
  selector: 'app-atividade-aluno',
  templateUrl: './atividade-aluno.component.html',
  styleUrls: ['./atividade-aluno.component.css']
})
export class AtividadeAlunoComponent implements OnInit {
  @Input() atividade: any;
  perguntas: any[] = []; // Para armazenar as perguntas

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const atividadeId = params['id'];
      console.log('ID da atividade:', atividadeId);

      this.authService.buscarAtividadePorId(atividadeId).subscribe(
        (atividade) => {
          console.log('Atividade recuperada:', atividade);
          this.atividade = atividade;

          this.authService.buscarPerguntasDaAtividade(atividadeId).subscribe(
            (perguntas) => {
              console.log('Perguntas recuperadas:', perguntas);
              this.perguntas = perguntas;

              const observables = this.perguntas.map((pergunta: any) =>
                this.authService.buscarOpcoesRespostaPorPerguntaId(pergunta.id) 
              );

              forkJoin(observables).subscribe(
                (respostas) => {
                  console.log('Aqui está as informações que vocÊ pediu', perguntas)
                  console.log('Opções de resposta recuperadas:', respostas);
              
                  respostas.forEach((opcoes, index) => {
                    const pergunta = this.perguntas[index];
                    console.log('Pergunta atual:', pergunta); // Verifique a estrutura da pergunta e se a propriedade id está presente
                    if (opcoes && opcoes.length > 0) {
                      this.perguntas[index].opcoes = opcoes;
                    } else {
                      this.perguntas[index].opcoes = [];
                    }
                  });
                },
                (error) => {
                  console.error('Erro ao buscar opções de resposta:', error);
                  // Tratar erro conforme necessário
                }
              );
            },
            (error) => {
              console.error('Erro ao buscar perguntas:', error);
              // Tratar erro conforme necessário
            }
          );
        },
        (error) => {
          console.error('Erro ao buscar atividade:', error);
          // Tratar erro conforme necessário
        }
      );
    });
  }
}
