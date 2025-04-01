const express = require("express");
const cors = require("cors");
const connection = require("./db_config");
const app = express();
 
app.use(cors());
app.use(express.json());
 
const port = 3000;
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));

app.post("/cadastrar", (req, res) => {
    const { nome, telefone, email, tipo, apartamento } = req.body;
  
    if ( !nome || !telefone || !email || !tipo || !apartamento) {
        return res.status(400).json({ success: false, message: "Todos os campos são obrigatórios." });
    }

        // if (results.length > 0) {
        //     return res.status(400).json({ success: false, message: "ID já registrado" });
        // }
  
        const query = "INSERT INTO moradores (nome, telefone, email, tipo, apartamento) VALUES (?, ?, ?, ?, ?)";
        connection.query(query, [nome, telefone, email, tipo, apartamento], (err) => {
            if (err) {
                console.error("Erro ao cadastrar carro:", err);
                return res.status(500).json({ success: false, message: "Erro ao cadastrar carro." });
            }
            res.json({ success: true, message: "Cadastro realizado com sucesso" });
        });
    });
  

    app.get('/listar', (req, res) => {
        const query = 'SELECT * FROM moradores';
        connection.query(query, (err, results) => {
          if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao buscar' });
          }
          res.json({ success: true, pessoal: results });
        });
    
      });
      app.delete('/deletar/:id', (req, res) => {
        const {id} = req.params;
        const query = 'DELETE FROM moradores WHERE id = ?';
        connection.query(query, [id], (err) => {
          if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao remover' });
          }
          res.json({ success: true, message: 'Removido com sucesso!' });
        });
      });

      app.put('/editar/:id', (req, res) => {
        const idAntigo = req.params.id;
        console.log(req.params);
        const idNovo = req.body.id;
        const nome = req.body.nome
        const email = req.body.email
        const tipo = req.body.tipo
        const apartamento = req.body.apartamento
      
        console.log(req.body);
        console.log('Recebendo requisição para editar:', { idAntigo, nome, idNovo, email, tipo, apartamento });
      
        const query = 'UPDATE moradores SET id=?, nome=?, email=?, tipo=?, apartamento=? WHERE id=?';
        connection.query(query, [ idAntigo, nome, idNovo, email, tipo, apartamento ], (err) => {
            if (err) {
                console.error('Erro no banco de dados:', err);
                return res.status(500).json({ success: false, message: 'Erro ao atualizar' });
            }
            res.json({ success: true, message: 'Atualizado com sucesso!' });
        });
      });
      

// app.put('/editar/:placa', (req, res) => {
//   const placaAntiga = req.params.placa;
//   console.log(req.params);
//   const placaNova = req.body.placa;
//   const dono = req.body.dono
//   const cpf = req.body.cpf
//   const tipo = req.body.tipo
//   const vaga = req.body.vaga

//   console.log(req.body);
//   console.log('Recebendo requisição para editar:', { placaAntiga, dono, placaNova, cpf, tipo, vaga });

//   const query = 'UPDATE usuario SET placa=?, dono=?, cpf=?, tipo=?, vaga=? WHERE placa=?';
//   connection.query(query, [placaNova, dono, cpf, tipo, vaga, placaAntiga], (err) => {
//       if (err) {
//           console.error('Erro no banco de dados:', err);
//           return res.status(500).json({ success: false, message: 'Erro ao atualizar carro.' });
//       }
//       res.json({ success: true, message: 'Carro atualizado com sucesso!' });
//   });
// });
