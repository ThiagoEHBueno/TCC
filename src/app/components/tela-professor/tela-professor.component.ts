import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

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

  modalAberto: boolean = false;

  constructor(private authService: AuthService) {}

  
  ngOnInit() {
    // Carregar as turmas ao inicializar o componente
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

    if (nomeTurmaElement && descricaoTurmaElement) {
      const nomeTurma = nomeTurmaElement.value;
      const descricaoTurma = descricaoTurmaElement.value;


    console.log('Adicionar turma chamado');
    // Recuperar o email do usuário armazenado no localStorage
    const userEmail = localStorage.getItem('userEmail');
    

    if (!userEmail) {
      console.log(userEmail)
      console.error('Email do usuário não encontrado.');
      return;
    }

    // Montar os dados da turma, incluindo o email do professor
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
        this.fecharModal(); // Fecha o modal após salvar a turma
      },
      (error) => {
        console.error('Erro ao criar turma:', error);
        // Tratar possíveis erros ao criar a turma
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
  // Chamada para buscar as turmas
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
      // Tratar possíveis erros ao buscar as turmas
    }
  );
}
}