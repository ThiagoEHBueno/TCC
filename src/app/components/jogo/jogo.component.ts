import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.component.html',
  styleUrls: ['./jogo.component.css']
})
export class JogoComponent implements OnInit {
  result: string = '';
  randomNumber: number = Math.floor(Math.random() * 50) + 1;
  userGuess: number = 0;
  attempts: number = 0;
  attemptsList: number[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  checkGuess(): void {
    this.attempts++;
  
    if (this.attemptsList.includes(this.userGuess)) {
      this.result = 'Você já tentou este número. Tente outro!';
      return;
    }
  
    this.attemptsList.push(this.userGuess);
  
    if (isNaN(this.userGuess) || this.userGuess <= 0 || this.userGuess > 50) {
      this.result = 'Por favor, digite um número entre 1 e 50.';
    } else if (this.userGuess < this.randomNumber) {
      this.result = 'Muito baixo! Tente novamente.';
    } else if (this.userGuess > this.randomNumber) {
      this.result = 'Muito alto! Tente novamente.';
    } else {
      this.result = `Parabéns! Você acertou o número em ${this.attempts} tentativas!`;
    }
  }

  restartGame(): void {
    this.result = '';
    this.randomNumber = Math.floor(Math.random() * 50) + 1;
    this.userGuess = 0;
    this.attempts = 0;
    this.attemptsList = [];
  }  

  showAttempts(): void {
    this.result = `Tentativas: ${this.attemptsList.join(', ')}`;
  }
}

