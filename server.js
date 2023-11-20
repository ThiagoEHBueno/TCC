const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();
const port = 3000;
const cors = require('cors');

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

app.use(cors()); // Configuração do CORS

app.use(bodyParser.json());

app.post('/api/cadastrarUsuario', (req, res) => {
  const { nome, sobrenome, idade, email, senha, escola, numero } = req.body;

  db.query(
    'INSERT INTO usuarios (nome, sobrenome, idade, email, senha, escola, numero) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [nome, sobrenome, idade, email, senha, escola, numero],
    (err, result) => {
      if (err) {
        console.error('Erro ao cadastrar usuário:', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
      } else {
        console.log('Usuário cadastrado com sucesso');
        res.status(200).json({ success: true });
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Servidor está ouvindo na porta ${port}`);
});
