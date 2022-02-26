const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
let name = ''
let phone = ''

const url =
  `mongodb+srv://admin:${password}@cluster0.xjyjt.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  phone: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 5) {
  name = process.argv[3]
  phone = process.argv[4]

  const person = new Person({
    name,
    phone
  })

  person.save().then(() => {
    console.log(`added ${name} number ${phone} to phonebook`)
    mongoose.connection.close()
  })
} else {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
}
