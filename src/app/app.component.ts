import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { jwtDecode } from 'jwt-decode';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  usuario: string = '';
  senha: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  fazerLogin(event: Event) {
  
    event.preventDefault();
    if (this.usuario.trim() === '' || this.senha.trim() === '') {
      alert('Preencha o email e a senha!');
      return;
    }

    // Lógica para fazer login
    const credentials = { email: this.usuario, senha: this.senha};
    this.authService.login(credentials).subscribe(
      (userInfoRes) => {
        if (userInfoRes && userInfoRes.token) {
          const decodedToken = jwtDecode<any>(userInfoRes.token);
          if (decodedToken && decodedToken.tipo) {
            const tipo = decodedToken.tipo;
            if (tipo === 'professor') {
              this.router.navigate(['/tela-professor']);
            } else if (tipo === 'aluno') {
              this.router.navigate(['/dashboard-aluno']);
            } else {
              alert('Tipo de usuário desconhecido');
            }
          } else {
            alert('Tipo de usuário não encontrado no token');
          }
        } else {
          alert('Token não encontrado na resposta do servidor');
        }
      },
      (userInfoErr) => {
        console.error('Erro ao recuperar informações do usuário:', userInfoErr);
        alert('Erro ao recuperar informações do usuário');
      }
    );
  }
}
