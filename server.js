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

db.connect((err) => { // Configuração do CORS
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
    // Gera um hash para a senha fornecida
    const hashSenha = await bcrypt.hash(senha, 10); // 10 é o custo do hash (quanto maior, mais seguro e lento)
    // Insere no banco de dados com a senha já hasheada
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

// Rota para lidar com o login
app.post('/api/login', (req, res) => {
  console.log('Recebida uma requisição POST em /api/login');
  const { email, senha, tipo } = req.body;

  // Verifique o tipo de usuário (professor ou aluno)
  if (tipo === 'professor' || tipo === 'aluno') {
    // Lógica de autenticação para professor ou aluno
    db.query('SELECT * FROM usuarios WHERE email = ?', [email], async (err, results) => {
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

  app.get('/api/perfilUsuario', (req, res) => {
    db.query('SELECT * FROM usuarios WHERE email = ?', [userEmail], (err, usuario) => {
      if (err) {
        console.error('Erro ao buscar perfil do usuário:', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
      } else {
        console.log('Perfil do usuário encontrado:', usuario);
        res.status(200).json(usuario);
      }
    }); 
  });

// Supondo que você já configurou seu servidor Express e tem o MySQL conectado

app.post('/api/criarTurma', (req, res) => {
  const { nome, descricao, email } = req.body;
  console.log('Dados recebidos:', { nome, descricao, email });

  // Execute uma query SQL para inserir os dados na tabela de turmas
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
  // Lógica para buscar as turmas do banco de dados
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


app.listen(port, () => {
  console.log(`Servidor está ouvindo na porta ${port}`);
});
