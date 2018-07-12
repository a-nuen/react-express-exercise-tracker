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

export default class UserForm extends React.Component {
  state = {
    status: 0
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    axios.post('/api/exercise/add', {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      reps: this.state.reps,
      weight: this.state.weight,
      date: this.state.date
    })
      .then(res => {
        this.setState({ 
          status: res.status
        }) 
        setTimeout(() => {
          this.setState({ status: 0})
        }, 3000);
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        <Form style={styles.formBox} onSubmit={this.handleSubmit} success error autocomplete='off'>
        <Header as='h3' textAlign='left'>
          Add Exercise
        </Header>
        <Form.Field>
        <input style={styles.inputBox} onChange={this.handleChange} name='username' type='text' placeholder='Username  *Required' />
        <input style={styles.inputBox} onChange={this.handleChange} name='description' type='text' placeholder='Description  *Required' />
        <input style={styles.inputBox} onChange={this.handleChange} name='duration' type='text' placeholder='Duration  (mins.)'/>
        <input style={styles.inputBox} onChange={this.handleChange} name='reps' type='text' placeholder='Reps'/>
        <input style={styles.inputBox} onChange={this.handleChange} name='weight' type='text' placeholder='Weight  (kgs)'/>
        <input style={styles.inputBox} onChange={this.handleChange} name='date' type='date' />
        </Form.Field>
        { this.state.status === 201 && <Message success header='Exercise saved' content="Add another exercise" />}
        { this.state.status === 200 && <Message error header='Exercise was not saved' content="Please make sure you filled out the required fields" />}
        <Button primary>Add</Button>
        </Form>
      </div>
    )
  }
}
