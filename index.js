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
    const body = req.body

    //pegando o nome que foi enviado
    const item = body.nome

    //colocando nome dentro da collection item
    await collection.insertOne(item)

    //enviando uma resposta
    res.send(item)
  })

  app.listen(3000)

}

main()
