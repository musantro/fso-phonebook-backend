require('dotenv').config()
const express = require('express')
const morgan = require("morgan");
const cors = require('cors');
const Person = require('./models/person')

const app = express()

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

morgan.token('body', (req, res) => req.method === 'POST' ? JSON.stringify(req.body) : '');

app.use(morgan(':method :url :status - :response-time ms :body'))

app.get('/info', (request, response) => {
  Person.count().then(count => {
    response.send(
      `<p>Phonebook has info for ${count} people</p>\n<p>${new Date()}</p>`
    )
  })
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (body.name === undefined || body.number === undefined) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
    date: new Date(),
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })

})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
