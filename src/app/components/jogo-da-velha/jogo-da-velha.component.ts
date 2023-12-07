import { Component } from '@angular/core';

@Component({
  selector: 'app-jogo-da-velha',
  templateUrl: './jogo-da-velha.component.html',
  styleUrls: ['./jogo-da-velha.component.css']
})
export class JogoDaVelhaComponent {
  tabuleiro = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  jogador1 = 'Jogador 1';
  jogador2 = 'Jogador 2';
  jogadorAtual = 'X';
  vencedor: string | null = null;
  empate: boolean = false;

  fazerJogada(row: number, col: number) {
    if (this.tabuleiro[row][col] === '' && !this.vencedor && !this.empate) {
      this.tabuleiro[row][col] = this.jogadorAtual === 'X' ? 'X' : 'O';
  
      if (this.verificarVitoria()) {
        this.vencedor = this.jogadorAtual;
      } else if (this.verificarEmpate()) {
        this.empate = true;
      } else {
        this.jogadorAtual = this.jogadorAtual === 'X' ? 'O' : 'X';
      }
    }
  }
  
  verificarVitoria() {
    for (let i = 0; i < 3; i++) {
      if (
        this.tabuleiro[i][0] !== '' &&
        this.tabuleiro[i][0] === this.tabuleiro[i][1] &&
        this.tabuleiro[i][0] === this.tabuleiro[i][2]
      ) {
        return true; // Vitória na linha
      }
      if (
        this.tabuleiro[0][i] !== '' &&
        this.tabuleiro[0][i] === this.tabuleiro[1][i] &&
        this.tabuleiro[0][i] === this.tabuleiro[2][i]
      ) {
        return true; // Vitória na coluna
      }
    }
  
    if (
      this.tabuleiro[0][0] !== '' &&
      this.tabuleiro[0][0] === this.tabuleiro[1][1] &&
      this.tabuleiro[0][0] === this.tabuleiro[2][2]
    ) {
      return true; // Vitória na diagonal principal
    }
    if (
      this.tabuleiro[0][2] !== '' &&
      this.tabuleiro[0][2] === this.tabuleiro[1][1] &&
      this.tabuleiro[0][2] === this.tabuleiro[2][0]
    ) {
      return true; // Vitória na diagonal secundária
    }
  
    return false;
  }

  verificarEmpate() {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (this.tabuleiro[row][col] === '') {
          return false; // Ainda há células vazias, o jogo não está empatado
        }
      }
    }
    return true; // Todas as células estão preenchidas, o jogo está empatado
  }

  reiniciarJogo() {
    this.tabuleiro = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];
    this.jogadorAtual = 'X';
    this.vencedor = null;
    this.empate = false;
  }
  
}
