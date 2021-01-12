import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'
import { DatabaseTest } from './Database'

chai.use(sinonChai)

describe('Database', () => {
  let db: DatabaseTest
  before(() => {
    db = new DatabaseTest()
  })

  it('should create the table', async () => {
    await db.init()
  })

  it('should return no object', async () => {
    const response = await db.listAllFactorizations()
    expect(response).to.eql([])
  })

  it('should create an object', async () => {
    const factorization = {
      number: 12,
      creationTimestamp: 1610360153,
      startOfProcessTimestamp: null,
      endOfProcessTimestamp: null,
      results: null,
    }
    await db.createNewFactorization(factorization)
  })

  it('should return created object in list', async () => {
    const factorization = {
      number: 12,
      creationTimestamp: 1610360153,
      startOfProcessTimestamp: null,
      endOfProcessTimestamp: null,
      results: null,
    }
    const response = await db.listAllFactorizations()
    expect(response).to.eql([ factorization ])
  })

  it('should return created object with filter', async () => {
    const factorization = {
      number: 12,
      creationTimestamp: 1610360153,
      startOfProcessTimestamp: null,
      endOfProcessTimestamp: null,
      results: null,
    }
    const response = await db.listToProcessedFactorizations()
    expect(response).to.eql([ factorization ])
  })

  it('should return created object', async () => {
    const factorization = {
      number: 12,
      creationTimestamp: 1610360153,
      startOfProcessTimestamp: null,
      endOfProcessTimestamp: null,
      results: null,
    }
    const response = await db.getFactorization(12)
    expect(response).to.eql(factorization)
  })

  it('should update object', async () => {
    const factorization = {
      number: 12,
      creationTimestamp: 1610360153,
      startOfProcessTimestamp: 1610360154,
      endOfProcessTimestamp: 1610360154,
      results: [2, 2, 3],
    }
    await db.updateFactorization(factorization)
  })

  it('should return updated  object', async () => {
    const factorization = {
      number: 12,
      creationTimestamp: 1610360153,
      startOfProcessTimestamp: 1610360154,
      endOfProcessTimestamp: 1610360154,
      results: [2, 2, 3],
    }
    const response = await db.getFactorization(12)
    expect(response).to.eql(factorization)
  })

  it('should return no object due to filter', async () => {
    const response = await db.listToProcessedFactorizations()
    expect(response).to.eql([])
  })
})
