import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-turmas-professor',
  templateUrl: './turmas-professor.component.html',
  styleUrls: ['./turmas-professor.component.css']
})
export class TurmasProfessorComponent implements OnInit {
  alunos: any[] = [];
  turmaId: number | null = null;
  turma: any;
  alunoForm!: FormGroup;
  nome_usuario: string = '';
  nome: string = '';
  sobrenome: string = '';
  senha: string = '';
  tipoAluno: string = 'aluno';


  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
   
    this.alunoForm = this.formBuilder.group({
      nome_usuario: ['', Validators.required],
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      tipoAluno: ['aluno'] // Certifique-se de adicionar o campo tipoAluno no FormGroup
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      const parsedId = parseInt(id, 10); // Converter a string para número
      if (!isNaN(parsedId)) {
        this.turmaId = parsedId;
        this.obterAlunosDaTurma(parsedId);
      } else {
        // Tratar caso o ID não seja um número válido
      }
    } else {
      // Tratar caso o ID não esteja presente na rota
    }
  }

  cadastrarAluno() {
    if (this.alunoForm.valid) {
      const alunoData = this.alunoForm.value;
      alunoData['tipo'] = 'aluno'; // Adiciona o tipo de usuário ao objeto do aluno

      alunoData['id_turma'] = this.turmaId;

      this.authService.cadastrarAluno(alunoData).subscribe(
        (data) => {
          console.log('Aluno cadastrado com sucesso:', data);
          // Lógica para lidar com o sucesso do cadastro
        },
        (error) => {
          console.error('Erro ao cadastrar aluno:', error);
          // Lógica para lidar com o erro de cadastro
        }
      );
    }
  }

  obterAlunosDaTurma(turmaId: number) {
    this.authService.obterAlunosDaTurma(turmaId).subscribe(
      (data) => {
        this.alunos = data; // Recebe os alunos obtidos da turma específica
      },
      (error) => {
        console.error('Erro ao obter alunos da turma:', error);
        // Lógica para lidar com erro ao obter alunos da turma
      }
    );
  }
  

}
