'use strict'

const db = require('../server/db')
const {User, Events, Group} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  //seed users
  const user1 = await User.create({
    handle: 'Frank',
    email: 'frank@email.com',
    password: '123'
  })

  const user2 = await User.create({
    handle: 'Cody',
    email: 'cody@email.com',
    password: '123'
  })

  const user3 = await User.create({
    handle: 'Murphy',
    email: 'murphy@email.com',
    password: '123'
  })

  //seed events
  const event1 = await Events.create({
    name: 'Dinner at OpenMarket',
    description: 'Meet up for fun cheap half off dinner',
    location: '343 Hanover',
    votes: 0
  })

  const event2 = await Events.create({
    name: 'Kilarny',
    description: 'Shots!',
    location: '7 Hanover',
    votes: 0
  })

  const event3 = await Events.create({
    name: 'Toms Restaurant',
    description: 'Fun time, good food!',
    location: '11 Hanover',
    votes: 0
  })

  //seed groups
  const group1 = await Group.create({
    name: 'Fantastic four',
    description: 'Derping around'
  })

  const group2 = await Group.create({
    name: 'FSGroup1',
    description: 'NoMoreShots! =['
  })

  const group3 = await Group.create({
    name: 'Football Buds',
    description: 'Fantasy (Haha) Football'
  })

  await user1.setGroups(group1)
  await group1.setUsers(user1)
  await event1.setGroup(group1)
  await group1.setEvents(event1)
  await event1.setUsers(user1)

  await user2.setGroups(group2)
  await group2.setUsers(user2)
  await event2.setGroup(group2)
  await group2.setEvents(event2)
  await event2.setUsers(user2)

  await user3.setGroups(group3)
  await group3.setUsers(user3)
  await event3.setGroup(group3)
  await group3.setEvents(event3)
  await event3.setUsers(user3)

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
