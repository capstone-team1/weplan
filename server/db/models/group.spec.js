/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../db')
const Group = db.model('group')

describe('Group model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('column definitions and validations', () => {
    it('has all fields', () => {
      return Group.create({
        name: 'friends',
        description: 'having fun'
      }).then(group => {
        expect(group.name).to.equal('friends')
        expect(group.description).to.equal('having fun')
      })
    })

    it('`name` is required', () => {
      const group = Group.build({
        description: 'having fun'
      })
      return group.validate().then(
        () => {
          throw new Error('Validation should have failed!')
        },
        err => {
          expect(err).to.be.an('error')
        }
      )
    })
  })
})
