import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tela-professor',
  templateUrl: './tela-professor.component.html',
  styleUrls: ['./tela-professor.component.css']
})
export class TelaProfessorComponent implements OnInit {
  listaTurmas: any[] = [];
  novaTurma: any = {
    nome: '',
    descricao: '',
    email: '',
  };
  nomeProfessor: string = '';
  escolaProfessor: string = '';
  sobrenomeProfessor: string = '';


  modalAberto: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  
  ngOnInit() {
    const emailProfessor = localStorage.getItem('userEmail');
    console.log('Valor de emailProfessor:', emailProfessor);

    if (emailProfessor) {
      this.obterInformacoesProfessorPorEmail(emailProfessor);
    }
    this.carregarTurmas();
  }

  abrirModal() {
    this.modalAberto = true;
  }

  fecharModal() {
    this.modalAberto = false;
  }

  fecharModalFora(event: any) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
      this.fecharModal();
    }
  }

  @HostListener('window:click', ['$event'])
  fecharModalForaClick(event: any) {
    this.fecharModalFora(event);
  }
  
  adicionarTurma() {
    const nomeTurmaElement = document.getElementById('nomeTurma') as HTMLInputElement;
    const descricaoTurmaElement = document.getElementById('descricaoTurma') as HTMLTextAreaElement;
    console.log(nomeTurmaElement)
   
    if (nomeTurmaElement && descricaoTurmaElement) {
      const nomeTurma = nomeTurmaElement.value;
      const descricaoTurma = descricaoTurmaElement.value;
      console.log(nomeTurma)
      
      

    console.log('Adicionar turma chamado');

    // recuperando o email
    const userEmail = localStorage.getItem('userEmail');
   
    

    if (!userEmail) {
      console.log(userEmail)
      console.error('Email do usuário não encontrado.');
      return;
    }

    // Monta os dados da turma
    this.novaTurma.email = userEmail;
    

      const turmaData = {
        ...this.novaTurma,
        emailProfessor: userEmail,
        nome: nomeTurma,
        descricao: descricaoTurma
        
      };

    
    this.authService.criarTurma(turmaData).subscribe(
      (data) => {
        console.log('Turma criada com sucesso:', data);
        this.listaTurmas.push(data); // Adiciona a nova turma à lista para ser exibida no HTML
        console.log('Lista de turmas atualizada:', this.listaTurmas);
        this.fecharModal();
      },
      (error) => {
        console.error('Erro ao criar turma:', error);
      }
    );
  }
}
carregarTurmas() {
    const userEmail = localStorage.getItem('userEmail');
    
    if (!userEmail) {
      console.error('Email do usuário não encontrado.');
      return;
    }
  
  this.authService.obterTurmas().subscribe(
    (data) => {
      this.listaTurmas = data.filter((turma: any) => {
        const emailTurma = turma.professor_email ? turma.professor_email.trim().toLowerCase() : null;
        const emailUsuario = userEmail.trim().toLowerCase();
        const saoIguais = emailTurma === emailUsuario;
        return saoIguais;
      });
    
      console.log('Lista de turmas:', this.listaTurmas);
    },
    (error) => {
      console.error('Erro ao carregar turmas:', error);
    }
  );
  }
  obterInformacoesProfessorPorEmail(email: string) {
    this.authService.obterProfessorPorEmail(email).subscribe(
      (data) => {
        console.log(data)
        // pega os dados do professor
        this.nomeProfessor = data.nome;
        this.sobrenomeProfessor = data.sobrenome;
        this.escolaProfessor = data.escola;
      },
      (error) => {
        console.error('Erro ao obter informações do professor:', error);
      }
    );
  }
  sair() {
    localStorage.removeItem('userEmail');
    this.router.navigate(['/tela-de-login']);
  }
}