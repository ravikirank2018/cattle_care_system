require('dotenv').config()
const { connect } = require('../db')
const Cow = require('../models/Cow')
const Advisory = require('../models/Advisory')
const Grant = require('../models/Grant')

async function seed() {
  await connect(process.env.MONGODB_URI)
  await Cow.deleteMany({})
  await Advisory.deleteMany({})
  await Grant.deleteMany({})

  await Cow.create([
    { tag: 'COW-001', age: 4, healthStatus: 'healthy', owner: 'Farmer A' },
    { tag: 'COW-002', age: 2, healthStatus: 'sick', owner: 'Farmer B' }
  ])

  await Advisory.create({ title: 'Fever management', body: 'Check temp regularly and isolate affected animals.' })
  await Grant.create({ name: 'Smallholder Support', amount: 5000, description: 'Support for vaccination and feed.' })

  console.log('Seed complete')
  process.exit(0)
}

seed().catch(err => { console.error(err); process.exit(1) })
