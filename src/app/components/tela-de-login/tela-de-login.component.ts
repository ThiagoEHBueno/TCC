import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-tela-de-login',
  templateUrl: './tela-de-login.component.html',
  styleUrls: ['./tela-de-login.component.css']
})
export class TelaDeLoginComponent {
  nomeUsuario: string = '';
  email: string = '';
  senha: string = '';
  tipo: string = '';
  id: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  fazerLogin() {
    console.log(this.tipo)
    if (this.email.trim() === '' || this.senha.trim() === '') {
      alert('Preencha usuário e senha!');
      return;
    }
  
    const credentials = { email: this.email, senha: this.senha, tipo: this.tipo };
    console.log(credentials);
    localStorage.setItem('userEmail', this.email);


    this.authService.login(credentials).subscribe(
      (res) => {
        if (this.tipo === 'professor') {
          this.router.navigate(['/tela-professor']);
        } else {
          console.log('Resposta do servidor:', res);
          alert('Resposta do servidor inválida');
        }
      },
      (err) => {

        console.error('Erro ao fazer login:', err);
        if (err.status === 401) {
          alert('Credenciais inválidas. Verifique seu email e senha.');
        } else if (err.status === 500) {
          alert('Erro interno no servidor. Tente novamente mais tarde.');
        } else {
          alert('Falha no login. Verifique suas credenciais.');
        }
      }
    );
  }

  fazerLoginAluno() {
    if (this.nomeUsuario.trim() === '' || this.senha.trim() === '') {
      alert('Preencha usuário e senha!');
      return;
    }
  
    const credentials = { nomeUsuario: this.nomeUsuario, senha: this.senha, tipo: this.tipo };
    console.log('dados: ', credentials);
    localStorage.setItem('user', this.nomeUsuario);
    
    this.authService.loginAluno(this.nomeUsuario, this.senha).subscribe(
      (res) => {
        this.router.navigate(['/tela-aluno']);
      },
      (err) => {
        console.error('Erro ao fazer login do aluno:', err);
        if (err.status === 401) {
          alert('Credenciais inválidas. Verifique seu nome de usuário e senha.');
        } else if (err.status === 500) {
          alert('Erro interno no servidor. Tente novamente mais tarde.');
        } else {
          alert('Falha no login. Verifique suas credenciais.');
        }
      }
    );
  }

  onChangeTipo(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.tipo = target.value;
  }
  
}
