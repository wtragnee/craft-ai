import { Component } from 'react'
import { Container, Form, Label, Dimmer, Loader } from 'semantic-ui-react'
import { HttpService } from '../services/HttpService'

export class Factorization extends Component {
  // Time to wait between each request during polling
  static DELAY = 1000

  constructor(props) {
    super(props)
    this.httpClient = new HttpService()
    this.state = {
      error: null,
      loading: false,
      factorization: null,
      number: null,
    }
  }

  render() {
    const { loading, factorization, error } = this.state
    return (
      <div>
        {loading && (
          <Dimmer active>
            <Loader />
          </Dimmer>
        )}
        {error && (
          <Container>
              <Label color='red'>{error.message}</Label>
          </Container>
        )}
        {!loading && (
          <div>
            <Container style={{ marginTop: '3em' }}>
              <Form onSubmit={event => this.handleSubmit(event)} widths="equal" >
                <Form.Group inline>
                  <Form.Field>
                    <Form.Input
                      fluid
                      type="number"
                      min={1}
                      onChange={(e, data) => this.handleChangeInput(data)}
                    />
                  </Form.Field>
                  <Form.Button fluid>Calculer</Form.Button>
                </Form.Group>
              </Form>
            </Container>
            {factorization && (
              <Container>
                <p>Résultats pour {factorization.number}: {JSON.stringify(factorization.results)}</p>
                <Container>
                  {/* Spec asked to set color red for a computation time of LESS than 5 seconds */}
                  <Label color={factorization.endOfProcessTimestamp - factorization.startOfProcessTimestamp >= 5 ? 'green' : 'red'}>Temps de calcul</Label>
                  <Label color={factorization.results.length < 4 ? 'green' : 'red'}>Nombre de facteurs</Label>
                  <Label color={Math.min(...factorization.results) < 1000 ? 'green' : 'red'}>Facteur minimal</Label>
                </Container>
              </Container>)
            }
          </div>
        )}
      </div>
    )
  }

  async handleSubmit(event) {
    event.preventDefault()
    this.setState({
      loading: true,
      error: null,
    })
    try {
      const response = await this.httpClient.createFactorization(this.state.number)
      if (response.status !== 200) {
        return this.handleError(new Error('Could not create process'))
      }
      this.fetchResults(this.state.number)
    } catch (err) {
      this.handleError(err)
    }
  }

  async fetchResults(number) {
    await this.delay()
    const response = await this.httpClient.fetchFactorization(number)
    if (200 !== response.status) {
      return this.handleError(new Error(`Received invalid status on API: ${response.status}`))
    }
    if (!response.data || !response.data.results ) {
      return this.fetchResults(number)
    }
    this.setState({
      factorization: response.data,
      loading: false,
    })
  }

  handleChangeInput({ value }) {
    this.setState({
      number: parseInt(value, 10),
    })
  }

  async delay() {
    return new Promise((resolve) => setTimeout(resolve, Factorization.DELAY))
  }

  handleError(error) {
    this.setState({ error, loading: false })
  }
}
