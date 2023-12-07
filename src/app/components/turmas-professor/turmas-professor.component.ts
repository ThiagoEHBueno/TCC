import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
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
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit() {
    const emailProfessor = localStorage.getItem('userEmail');
    console.log(emailProfessor)
    this.alunoForm = this.formBuilder.group({
      nome_usuario: ['', Validators.required],
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', Validators.required],
      tipoAluno: ['aluno'] 
    }, {
      validators: this.passwordMatchValidator
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      const parsedId = parseInt(id, 10); 
      if (!isNaN(parsedId)) {
        this.turmaId = parsedId;
        this.obterAlunosDaTurma(parsedId);  
        this.changeDetectorRef.detectChanges();
      } else {
        console.error('ID inválido. O ID fornecido não é um número válido.');
      }
    } else {
      console.error('ID ausente. Nenhum ID fornecido na rota.');
    }
  }

  abrirAtividades() {
    this.router.navigate(['/lista-de-atividades']); 
  }

  passwordMatchValidator(group: FormGroup) {
    const senha = group.get('senha')?.value;
    const confirmarSenha = group.get('confirmarSenha')?.value;
  
    return senha === confirmarSenha ? null : { mismatch: true };
  }

  cadastrarAluno() {
    const emailProfessor = localStorage.getItem('userEmail');
    if (this.alunoForm.valid) {
      const alunoData = this.alunoForm.value;
      alunoData['tipo'] = 'aluno'; // Adiciona o tipo de usuário ao objeto do aluno
      alunoData['email_professor'] = emailProfessor;

      alunoData['id_turma'] = this.turmaId;

      this.authService.cadastrarAluno(alunoData).subscribe(
        (data) => {
          console.log('Aluno cadastrado com sucesso:', data);
        },
        (error) => {
          console.error('Erro ao cadastrar aluno:', error);
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
      }
    );
  }
}
