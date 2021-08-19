const express = require('express')
const app = express()

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

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
