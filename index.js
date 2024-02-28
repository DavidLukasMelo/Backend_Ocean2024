const express = require('express')
const { MongoClient, ObjectId } = require('mongodb')

const dbUrl = 'mongodb+srv://admin:hhtAGKhZbbByByaR@cluster0.zhgulcw.mongodb.net/'
const dbName = 'Ocean2024'



async function main() {

  const client = new MongoClient(dbUrl)

  console.log('Conectando na lokura...')
  await client.connect()
  console.log('Sucesso meu nobre!')


  const app = express()

  app.get('/', function (req, res) {
    res.send('Hello World')
  })

  app.get('/oi', function (req, res) {
    res.send('hello there')
  })

  //  Lista de Nomes

  const list = ["A1", "A2", "A3"]

 const db = client.db(dbName)
 const collection = db.collection('items')

  // Read All --> GET
  app.get('/item', async function (req, res) {
    const items = await collection.find().toArray()

    res.send(items)
  
  })

  app.get('/item/:id', function (req, res) {
    //Acesso id no parametro de rota
    const id = req.params.id
    //Acesso item na lista baseado no id
    const item = collection.findOne({
      _id: new ObjectId(id)
    })



    //enviando o item como resposta
    res.send(item)
  })

  //sinalizando que o corpo da req e JSON
  app.use(express.json())

  //Creat POST
  app.post('/item', async function (req, res) {
    //Extraindo o corpo da req
    const item = req.body

    //colocando nome dentro da collection item
    await collection.insertOne(item)

    //enviando uma resposta
    res.send(item)
  })
  
  app.put('/item/:id', async function(req, res){
    const id = req.params.id

    // Novo item da requisição
    const novoItem = req.body
    
    // Atualizar banco de dados
    await collection.updateOne(
      
      {_id: new ObjectId(id)},
      {$set: novoItem}
    
      )

    res.send('Atualização com sucesso :) ')
  })

  // Delete -> [DELETE] /item/:id
  app.delete('/item/:id', async function(req, res){
    
    const id = req.params.id
    await collection.deleteOne({_id: new ObjectId(id)})
    res.send('Item deletado x_x')
  
  })

  app.listen(3000)

}

main()
