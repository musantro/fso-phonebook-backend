const express = require('express')
const morgan = require("morgan");
const cors = require('cors');

const app = express()

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

let persons = [
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  },
  {
    "name": "fdsalj",
    "number": "9832",
    "id": 7
  },
  {
    "name": "fdsfa",
    "number": "3",
    "id": 8
  },
  {
    "name": "asdf",
    "number": "3",
    "id": 9
  },
  {
    "name": "C-3PO",
    "number": "123455",
    "id": 10
  }
]

morgan.token('body', (req, res) => req.method === 'POST' ? JSON.stringify(req.body) : '');

app.use(morgan(':method :url :status - :response-time ms :body'))

app.get('/info', (request, response) => {
  response.send(
    `<p>Phonebook has info for ${persons.length} people</p>\n<p>${new Date()}</p>`
  )
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(note => note.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})
const generateId = () => {
  const bigAmount = 100_000_000
  return Math.ceil(Math.random() * bigAmount);
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const names = persons.map(p => p.name)
  if (names.includes(body.name)) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    date: new Date(),
    id: generateId(),
  }

  persons = persons.concat(person)

  response.json(person)
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
