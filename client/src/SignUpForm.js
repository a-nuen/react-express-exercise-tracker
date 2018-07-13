import React from 'react'
import { Form } from 'semantic-ui-react'
import { Button, Header, Message } from 'semantic-ui-react'
import axios from 'axios'

const styles = {
  formBox: {
    margin: 5
  },
  inputBox: {
    marginTop: 5,
    marginBottom: 5
  }
}

export default class SignUpForm extends React.Component {
  state = {
    input: '',
    status: 0
  }

  handleChange = (e) => {
    this.setState({
      input: e.target.value,
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    axios.post('/api/exercise/new-user', {username: this.state.input})
      .then(res => {
        this.setState({ status: res.status }) 
        setTimeout(() => {
          this.setState({ status: 0})
        }, 3000); 
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <Form style={styles.formBox} onSubmit={this.handleSubmit} success error autocomplete='off' >
        <Header as='h3' textAlign='left'>
          Create New User
        </Header>
        <Form.Field>
          <input 
            style={styles.inputBox} 
            type='text'
            name='username'
            placeholder='Username' 
            value={this.state.input} 
            onChange={this.handleChange} />
        </Form.Field>
        { this.state.status === 201 && <Message success header='New User Created' content="Please use your registerd Username when adding exercises" />}
        { this.state.status === 200 && <Message error header='User already exists' content="Please use your registerd Username when adding exercises" />}
        <Button primary>Submit</Button>
      </Form>
    )
  }
}