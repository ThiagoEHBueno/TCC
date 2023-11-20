import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-professor',
  templateUrl: './cadastro-professor.component.html',
  styleUrls: ['./cadastro-professor.component.css']
})

export class CadastroProfessorComponent implements OnInit {
  cadastroForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.cadastroForm = this.formBuilder.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      idade: ['', [Validators.required, Validators.min(0)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', Validators.required],
      escola: [''],
      numero: [''],
    });
  }

  cadastrar() {
    this.authService.cadastrarUsuario(this.cadastroForm.value).subscribe(
      (data) => {
        console.log('Usuário cadastrado com sucesso', data);
        this.router.navigate(['/tela-de-login']);
      },
      (error) => {
        console.error('Erro ao cadastrar usuário', error);
      }
    );
  }
}
