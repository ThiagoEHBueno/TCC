import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-tela-de-login',
  templateUrl: './tela-de-login.component.html',
  styleUrls: ['./tela-de-login.component.css']
})
export class TelaDeLoginComponent {
  email: string = '';
  senha: string = '';
  tipo: string = '';
  id: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  fazerLogin() {
    if (this.email.trim() === '' || this.senha.trim() === '') {
      alert('Preencha usuário e senha!');
      return;
    }
  
    const credentials = { email: this.email, senha: this.senha, tipo: this.tipo };
    console.log(credentials);
    localStorage.setItem('userEmail', this.email);
            // Para recuperar o email armazenado:
    const userEmail = localStorage.getItem('userEmail');

    this.authService.login(credentials).subscribe(
      (res) => {
        if (this.tipo === 'professor') {
          this.router.navigate(['/tela-professor']);
        } else if (this.tipo === 'aluno') {
          this.router.navigate(['/dashboard-aluno']);
        } else {
          console.log('Resposta do servidor:', res);
          alert('Resposta do servidor inválida');
        }
      },
      (err) => {
        // Tratamento de erros específicos
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

  onChangeTipo(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.tipo = target.value;
  }
  
}
