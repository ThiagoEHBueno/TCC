import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api';
  nomeTurma: string = '';

  constructor(private http: HttpClient) {}

  cadastrarUsuario(usuario: any): Observable<any> {
    console.log('Dados a serem enviados:', usuario);
    const url = `${this.baseUrl}/cadastrarUsuario`;
    return this.http.post(url, usuario);
  }
    
  login(credentials: { email: string, senha: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, credentials).pipe(
    );
  }

  loginAluno(nomeUsuario: string, senha: string): Observable<any> {
    const credentials = { nome_usuario: nomeUsuario, senha, tipo: 'aluno' };
    return this.http.post<any>(`${this.baseUrl}/loginAluno`, credentials);
  }  

  criarTurma(turmaData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/criarTurma`, turmaData);
  }

  obterTurmas(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + '/turmas');
  }

  obterDetalhesTurma(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }  

  cadastrarAluno(dadosAluno: any): Observable<any> {
    console.log('Dados a serem enviados:', dadosAluno);
    const url = `${this.baseUrl}/cadastrarAluno`;
    return this.http.post(url, dadosAluno);
  }

  obterAlunos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/obterAlunos`);
  }

  obterAlunosDaTurma(idTurma: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/obterAlunosDaTurma/${idTurma}`);
  }

  obterProfessorPorEmail(email: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/obterProfessorPorEmail/${email}`);
  }
  
  obterAlunoPorUsuario(nome_usuario: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/obterAlunoPorUsuario/${nome_usuario}`);
  }
  
  obterAtividadesDaTurmaParaAluno(idTurma: number, idAluno: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/atividades/turma/${idTurma}/alunos/${idAluno}`);
  }

  obterAlunosComTurma(emailProfessor: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/obterAlunosComTurma/${emailProfessor}`);
  }
  
  enviarAtividade(atividadeData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/enviarAtividade`, atividadeData);
  }

  obterAtividadesPorTurma(idTurma: string): Observable<any[]> {
    const url = `${this.baseUrl}/atividades/turma/${idTurma}`;
    return this.http.get<any[]>(url);
  }

  obterIdTurmaDoAluno(alunoUsuario: string): Observable<any> {
    return this.http.get<any>(`/api/obterIdTurmaDoAluno/${alunoUsuario}`);
  }

  buscarAtividadePorId(id: number): Observable<any> {
    const url = `${this.baseUrl}/atividades/${id}`;
    return this.http.get<any>(url);
  }
  
  buscarPerguntasDaAtividade(id: number): Observable<any> {
    const url = `${this.baseUrl}/perguntas/${id}`;
    return this.http.get<any>(url);
  }

  buscarOpcoesRespostaPorPerguntaId(idPergunta: number): Observable<any> {
    const url = `${this.baseUrl}/opcoes-resposta/${idPergunta}`;
    return this.http.get<any>(url);
  }
}