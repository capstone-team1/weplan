'use strict'

const db = require('../server/db')
const {User, Events, Group} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const newUser = await User.create({
    handle: 'frank',
    email: 'frank@email.com',
    password: '123'
  })

  const users = await Promise.all([
    User.create({handle: 'Cody', email: 'cody@email.com', password: '123'}),
    User.create({handle: 'Murphy', email: 'murphy@email.com', password: '123'})
  ])

  const events = await Promise.all([
    Events.create({
      name: 'Dinner at OpenMarket',
      description: 'Meet up for fun cheap half off dinner',
      location: '343 Hanover',
      upvotes: 2,
      downvotes: 1
    }),
    Events.create({
      name: 'Kilarny',
      description: 'Shots!',
      location: '7 Hanover',
      upvotes: 1,
      downvotes: 2
    })
  ])
  const newEvent = await Events.create({
    name: 'testEvent',
    description: 'test',
    location: 'testlocal',
    upvotes: 1,
    downvotes: 3
  })
  const groups = await Promise.all([
    Group.create({
      name: 'Fantastic four',
      description: 'Derping around',
      chatId: 1
    }),
    Group.create({
      name: 'FSGroup1',
      description: 'NoMoreShots!',
      chatId: 2
    })
  ])
  const newGroup = await Group.create({
    name: 'newGroup',
    description: 'testGroup',
    chatId: '3'
  })
  await newGroup.setEvents(events[0])
  await newEvent.setGroup(groups[0])
  await newUser.setGroups(groups[0])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${groups.length} groups`)
  console.log(`seeded ${events.length} events`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
