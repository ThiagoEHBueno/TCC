const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();
const port = 3000;
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'cadastro',
});

db.connect((err) => { 
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conexão ao banco de dados bem-sucedida');
  }
});
app.use(cors({
  origin: ['http://localhost:4200', 'http://localhost:3000'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}));

app.use(bodyParser.json());
app.post('/api/cadastrarUsuario', async (req, res) => {
  const { nome, sobrenome, idade, email, senha, escola, numero, tipo } = req.body;

  try {
    const hashSenha = await bcrypt.hash(senha, 10);
    db.query(
      'INSERT INTO usuarios (nome, sobrenome, idade, email, senha, escola, numero, tipo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [nome, sobrenome, idade, email, hashSenha, escola, numero, tipo],
      (err, result) => {
        if (err) {
          console.error('Erro ao cadastrar usuário:', err);
          res.status(500).json({ error: 'Erro interno do servidor' });
        } else {
          console.log('Usuário cadastrado com sucesso');
          console.log('Resposta de sucesso enviada:', { success: true });
          res.status(200).json({ success: true });
        }
      }
    );
  } catch (error) {
    console.error('Erro ao hashear a senha:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.post('/api/login', (req, res) => {
  console.log('Recebida uma requisição POST em /api/login');
  const { email, senha, tipo } = req.body;

  if (tipo === 'professor') {
    db.query('SELECT id, nome, sobrenome, idade, email, senha, escola, numero, tipo FROM usuarios WHERE email = ?', [email], async (err, results) => {
      if (err) {
        console.error('Erro ao buscar usuário:', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
      } else if (results.length === 0) {
        console.log('Usuário não encontrado:', email);
        res.status(401).json({ error: 'Credenciais inválidas' });
      } else {
        const usuario = results[0];
        const senhaDoUsuario = usuario.senha;

        try {
          const match = await bcrypt.compare(senha, senhaDoUsuario);
          
          if (match) {
            console.log('Login bem-sucedido:', email);

            db.query('SELECT tipo FROM usuarios WHERE id = ?', [usuario.id], (err, userInfo) => {
              if (err) {
                console.error('Erro ao buscar informações do usuário:', err);
                res.status(500).json({ error: 'Erro interno do servidor' });
              } else {
                console.log('Informações do usuário recuperadas:', userInfo); // Adicionar este log para verificar as informações recuperadas
          
                if (userInfo && userInfo.length > 0) {
                  const tipo = userInfo[0].tipo; // Obtendo o tipo dentro deste escopo
                  console.log('Tipo do usuário:', tipo); // Adicionar este log para verificar o tipo recuperado
          
                  const token = jwt.sign(
                    {
                      usuarioId: usuario.id,
                      email: usuario.email,
                      tipo: tipo // Incluindo o tipo na informação do token
                    },
                    'seuSegredo', // Use sua chave secreta para assinar o token
                    { expiresIn: '1h' }
                  );
                  res.status(200).json({id: usuario.id, token });
                } else {
                  console.log('Nenhuma informação de tipo de usuário encontrada.');
                  res.status(500).json({ error: 'Informações de usuário ausentes' });
                }
              }
            });
          } else {
            console.log('Senha incorreta para o usuário:', email);
            res.status(401).json({ error: 'Credenciais inválidas' });
          }
        } catch (error) {
          console.error('Erro ao comparar senhas:', error);
          res.status(500).json({ error: 'Erro interno do servidor' });
        }
      }
    });
  } else {
    res.status(400).json({ error: 'Tipo de usuário inválido' });
  }
});

app.post('/api/criarTurma', (req, res) => {
  const { nome, descricao, email } = req.body;
  console.log('Dados recebidos:', { nome, descricao, email });

  db.query(
    'INSERT INTO Turmas (nome, descricao, professor_email) VALUES (?, ?, ?)',
    [nome, descricao, email],
    (err, result) => {
      if (err) {
        console.error('Erro ao criar turma:', err);
        res.status(500).json({ error: 'Erro ao criar turma' });
      } else {
        console.log('Turma criada com sucesso');
        res.status(200).json({ success: true, turma: { nome, descricao, email }});
      }
    }
  );
});

app.get('/api/turmas', (req, res) => {
  db.query('SELECT * FROM turmas', (err, turmas) => {
    if (err) {
      console.error('Erro ao buscar as turmas:', err);
      res.status(500).json({ error: 'Erro interno do servidor ao buscar as turmas' });
    } else {
      console.log('Turmas encontradas:', turmas);
      res.status(200).json(turmas);
    }
  });
});

app.post('/api/cadastrarAluno', async (req, res) => {
  const { nome, sobrenome, nome_usuario, senha, tipo, id_turma } = req.body;

  const emailProfessor = req.body.email_professor;

  try {
    const hashSenha = await bcrypt.hash(senha, 10);

    db.query(
      'INSERT INTO alunos (nome, sobrenome, nome_usuario, senha, tipo, id_turma, professor_email) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [nome, sobrenome, nome_usuario, hashSenha, tipo, id_turma, emailProfessor],
      (err, result) => {
        if (err) {
          console.error('Erro ao cadastrar aluno:', err);
          res.status(500).json({ error: 'Erro interno do servidor' });
        } else {
          console.log('Aluno cadastrado com sucesso');
          res.status(200).json({ success: true });
        }
      }
    );
  } catch (error) {
    console.error('Erro ao hashear a senha:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});


app.get('/api/obterAlunosDaTurma/:idTurma', async (req, res) => {
  const idTurma = req.params.idTurma;
  
  try {
    console.log(idTurma)
    db.query('SELECT * FROM alunos WHERE id_turma = ?', [idTurma], (err, result) => {
      if (err) {
        console.error('Erro ao buscar alunos da turma:', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
      } else {
        console.log('Alunos da turma obtidos com sucesso');
        res.status(200).json(result); // Retorna os alunos da turma em formato JSON
      }
    });
  } catch (error) {
    console.error('Erro ao buscar alunos da turma:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.get('/api/obterAlunos', async (req, res) => {
  try {
    db.query('SELECT * FROM alunos', (err, result) => {
      if (err) {
        console.error('Erro ao buscar alunos:', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
      } else {
        console.log('Alunos obtidos com sucesso');
        res.status(200).json(result);
      }
    });
  } catch (error) {
    console.error('Erro ao buscar alunos:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.get('/api/obterProfessorPorEmail/:emailUsuario', async (req, res) => {
  const emailUsuario = req.params.emailUsuario;
  
  try {
    db.query('SELECT nome, sobrenome, escola, tipo FROM usuarios WHERE email = ?', [emailUsuario], (err, result) => {
      if (err) {
        console.error('Erro ao buscar o usuário:', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
      } else {
        if (result.length > 0) {
          const usuario = result[0]; 
          console.log('Usuário obtido com sucesso:', usuario);
          res.status(200).json(usuario); 
        } else {
          console.log('Usuário não encontrado para o email:', emailUsuario);
          res.status(404).json({ message: 'Usuário não encontrado' });
        }
      }
    });
  } catch (error) {
    console.error('Erro ao buscar o usuário:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.get('/api/obterAlunoPorUsuario/:alunoUsuario', async (req, res) => {
  const alunoUsuario = req.params.alunoUsuario;
  console.log('Recebido pedido para buscar usuário:', alunoUsuario);
  
  try {
  
    db.query('SELECT nome, id_turma FROM alunos WHERE nome_usuario = ?', [alunoUsuario], (err, result) => {
      if (err) {
        console.error('Erro ao buscar o usuário:', err); 
        res.status(500).json({ error: 'Erro interno do servidor' });
      } else {
        if (result.length > 0) {
          const usuario = result[0]; 
          console.log('Usuário obtido com sucesso:', usuario); 
          res.status(200).json(usuario); 
        } else {
          console.log('Usuário não encontrado para o nome de usuário:', alunoUsuario);
          res.status(404).json({ message: 'Usuário não encontrado' });
        }
      }
    });
  } catch (error) {
    console.error('Erro ao buscar o usuário:', error); 
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});


app.post('/api/loginAluno', (req, res) => {
  console.log('Recebida uma requisição POST em /api/login');
  const { nome_usuario, senha, tipo } = req.body;

  if (tipo === 'aluno') {
    db.query('SELECT * FROM alunos WHERE nome_usuario = ?', [nome_usuario], async (err, results) => {
      if (err) {
        console.error('Erro ao buscar usuário:', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
      } else if (results.length === 0) {
        console.log('Usuário não encontrado:', nome_usuario);
        res.status(401).json({ error: 'Credenciais inválidas' });
      } else {
        const usuario = results[0];
        const senhaDoUsuario = usuario.senha;

        try {
          const match = await bcrypt.compare(senha, senhaDoUsuario);
          
          if (match) {
            console.log('Login bem-sucedido:', nome_usuario);

            db.query('SELECT tipo FROM alunos WHERE id = ?', [usuario.id], (err, userInfo) => {
              if (err) {
                console.error('Erro ao buscar informações do usuário:', err);
                res.status(500).json({ error: 'Erro interno do servidor' });
              } else {
                console.log('Informações do usuário recuperadas:', userInfo); // Adicionar este log para verificar as informações recuperadas
          
                if (userInfo && userInfo.length > 0) {
                  const tipo = userInfo[0].tipo; // Obtendo o tipo dentro deste escopo
                  console.log('Tipo do usuário:', tipo); // Adicionar este log para verificar o tipo recuperado
          
                  const token = jwt.sign(
                    {
                      usuarioId: usuario.id,
                      nome_usuario: usuario.nome_usuario,
                      tipo: tipo // Incluindo o tipo na informação do token
                    },
                    'seuSegredo', // Use sua chave secreta para assinar o token
                    { expiresIn: '1h' }
                  );
                  res.status(200).json({id: usuario.id, token });
                } else {
                  console.log('Nenhuma informação de tipo de usuário encontrada.');
                  res.status(500).json({ error: 'Informações de usuário ausentes' });
                }
              }
            });
          } else {
            console.log('Senha incorreta para o usuário:', nome_usuario);
            res.status(401).json({ error: 'Credenciais inválidas' });
          }
        } catch (error) {
          console.error('Erro ao comparar senhas:', error);
          res.status(500).json({ error: 'Erro interno do servidor' });
        }
      }
    });
  } else {
    res.status(400).json({ error: 'Tipo de usuário inválido' });
  }
});

app.get('/api/obterAlunosComTurma/:emailUsuario', async (req, res) => {
  const emailUsuario = req.params.emailUsuario;
  try {
    db.query('SELECT alunos.*, turmas.id AS id_turma, turmas.nome AS nome_turma, turmas.professor_email FROM alunos INNER JOIN turmas ON alunos.id_turma = turmas.id WHERE turmas.professor_email = ?', [emailUsuario], (err, result) => {
      if (err) {
        console.error('Erro ao buscar alunos com turma:', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
      } else {
        console.log(emailUsuario)
        console.log('Alunos com informações de turma obtidos com sucesso');
        res.status(200).json(result);
      }
    });
  } catch (error) {
    console.error('Erro ao buscar alunos com turma:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.post('/api/enviarAtividade', async (req, res) => {
  const { titulo, idTurma, perguntas } = req.body;
  console.log('Titulo: ', titulo);
  console.log('idTurma: ', idTurma);
  console.log('Perguntas: ', perguntas);

  try {
    const atividadeQuery = 'INSERT INTO atividades (titulo, id_turma) VALUES (?, ?)';
    const perguntasQuery = 'INSERT INTO perguntas (atividade_id, texto_da_pergunta) VALUES (?, ?)';
    const opcoesRespostaQuery = 'INSERT INTO opcoes_resposta (pergunta_id, texto_da_opcao, correta) VALUES (?, ?, ?)';

    const atividadeResult = await queryDB(atividadeQuery, [titulo, idTurma]);
    const atividadeId = atividadeResult.insertId;

    for (const pergunta of perguntas) {
      const perguntaResult = await queryDB(perguntasQuery, [atividadeId, pergunta.enunciado]);
      const perguntaId = perguntaResult.insertId;

      for (const opcaoResposta of pergunta.opcoes) {
        await queryDB(opcoesRespostaQuery, [perguntaId, opcaoResposta, false]);
      }
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Erro ao enviar atividade:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});


async function queryDB(query, values) {
  return new Promise((resolve, reject) => {
    db.query(query, values, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

app.get('/api/atividades/turma/:idTurma', async (req, res) => {
  const { idTurma } = req.params;

  try {
    const atividadesDaTurma = await queryDB('SELECT * FROM atividades WHERE id_turma = ?', [idTurma]);
    res.status(200).json(atividadesDaTurma);
  } catch (error) {
    console.error('Erro ao obter atividades da turma:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.get('/api/atividades/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const atividade = await queryDB('SELECT * FROM atividades WHERE id = ?', [id]);

    if (!atividade || atividade.length === 0) {
      return res.status(404).json({ message: 'Atividade não encontrada' });
    }

    res.status(200).json(atividade[0]);
  } catch (error) {
    console.error('Erro ao buscar atividade por ID:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.get('/api/perguntas/:atividadeId', async (req, res) => {
  const { atividadeId } = req.params;

  try {
    const perguntas = await queryDB('SELECT id, texto_da_pergunta FROM perguntas WHERE atividade_id = ?', [atividadeId]);

    res.status(200).json(perguntas);
  } catch (error) {
    console.error('Erro ao buscar perguntas por atividade:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.get('/api/opcoes-resposta/:idPergunta', async (req, res) => {
  const idPergunta = req.params.idPergunta;

  try {
    console.log(idPergunta)
    const opcoesResposta = await queryDB('SELECT * FROM opcoes_resposta WHERE pergunta_id = ?', [idPergunta]);

    res.status(200).json(opcoesResposta);
  } catch (error) {
    console.error('Erro ao buscar opções de resposta:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});



app.listen(port, () => {
  console.log(`Servidor está ouvindo na porta ${port}`);
});


