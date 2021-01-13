import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { FactorizationHandler, Factorization } from '../FactorizationHandler'
import { services } from '../../../../services/__tests__/index'
import { fromDateToTimestamp } from '../../../../utils/timestamp'

chai.use(sinonChai)

describe('FactorizationHandler', () => {
  it('should create factorization', async () => {
    const handler = new FactorizationHandler(services)
    const stub = sinon.stub(services.database, 'createNewFactorization')
    const factorization = {
      number: 123,
      creationTimestamp: fromDateToTimestamp(new Date()),
      startOfProcessTimestamp: null,
      endOfProcessTimestamp: null,
      results: null,
    }
    const res = await handler.createFactorization(123)
    expect(stub.calledWithExactly(factorization)).to.be.true
    expect(res).to.eql(factorization)
    stub.restore()
  })

  it('should get factorization', async () => {
    const handler = new FactorizationHandler(services)
    const factorization = {
      number: 123,
      creationTimestamp: fromDateToTimestamp(new Date()),
      startOfProcessTimestamp: null,
      endOfProcessTimestamp: null,
      results: null,
    }
    const stub = sinon.stub(services.database, 'getFactorization').returns(Promise.resolve(factorization))
    const res = await handler.getFactorization(123)
    expect(stub.calledWithExactly(123)).to.be.true
    expect(res).to.eql(factorization)
    stub.restore()
  })

  it('should list all factorizations', async () => {
    const handler = new FactorizationHandler(services)
    const factorizations: Factorization[] = [
      {
        number: 123,
        creationTimestamp: 123456,
        startOfProcessTimestamp: null,
        endOfProcessTimestamp: null,
        results: null,
      },
      {
        number: 1234,
        creationTimestamp: 123456,
        startOfProcessTimestamp: 123456,
        endOfProcessTimestamp: 123456,
        results: [2, 2, 3, 3],
      }
    ]
    const stub = sinon.stub(services.database, 'listAllFactorizations').returns(Promise.resolve(factorizations))
    const res = await handler.listFactorization(false)
    expect(stub.calledWithExactly()).to.be.true
    expect(res).to.eql({ factorizations })
    stub.restore()
  })

  it('should list factorizations to process', async () => {
    const handler = new FactorizationHandler(services)
    const factorizations: Factorization[] = [
      {
        number: 123,
        creationTimestamp: 123456,
        startOfProcessTimestamp: null,
        endOfProcessTimestamp: null,
        results: null,
      },
    ]
    const stub = sinon.stub(services.database, 'listToProcessedFactorizations').returns(Promise.resolve(factorizations))
    const res = await handler.listFactorization(true)
    expect(stub.calledWithExactly()).to.be.true
    expect(res).to.eql({ factorizations })
    stub.restore()
  })

  it('should update factorization', async () => {
    const handler = new FactorizationHandler(services)
    const factorization: Factorization = {
      number: 123,
      creationTimestamp: 123456,
      startOfProcessTimestamp: 123456,
      endOfProcessTimestamp: 123456,
      results: [2, 2, 3, 3],
    }
    const stub = sinon.stub(services.database, 'updateFactorization')
    const res = await handler.updateFactorization(factorization)
    expect(stub.calledWithExactly(factorization)).to.be.true
    expect(res).to.eql(factorization)
    stub.restore()
  })
})