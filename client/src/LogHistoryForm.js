import React from 'react'
import { Form } from 'semantic-ui-react'
import { Button, Header, Modal, Message, List, Label } from 'semantic-ui-react'
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

export default class LogHistoryForm extends React.Component {
  state = {
    data: [],
    invalid: false,
    modal: false
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if(!this.state.username) return this.setState({invalid: true})
    axios.get(`/api/exercise/log?username=${this.state.username}&from=${this.state.from}&to=${this.state.to}`)
      .then(res => {
        if(res.data === 'user not found') return this.setState({invalid: true})
        this.setState({
           data: res.data,
           invalid: false,
           modal: true  
        })
      })
      .catch(err => console.log(err))
  }

  closeModal = () => {
    this.setState({ modal: false })
  }

  render() {
    
    return (
      <Form style={styles.formBox} onSubmit={this.handleSubmit} success error autocomplete='off' >
        <Header as='h3' textAlign='left'>
          Search Exercise History
        </Header>
        <Form.Field>
          <input 
            style={styles.inputBox} 
            type='text'
            name='username'
            placeholder='Username  *Required' 
            onChange={this.handleChange} />
          <Label as='a' color='orange' ribbon>From</Label>
          <input 
            style={styles.inputBox} 
            type='date'
            name='from'
            placeholder='From' 
            onChange={this.handleChange} />
          <Label as='a' color='orange' ribbon>To</Label>
          <input 
            style={styles.inputBox} 
            type='date'
            name='to'
            placeholder='To' 
            onChange={this.handleChange} />
        </Form.Field>
        { this.state.invalid && <Message error header='User not found' content="Please make sure you entered in your username" /> }
        <Button primary data-tooltip='Will display a maximum of 20 results'>Search</Button>
        <Modal open={this.state.modal} onClose={this.closeModal} closeIcon>
          <Header content='History' />
          <Modal.Content>
            {!this.state.data.length && <div>No history found</div>}
            {this.state.data.map(item =>
              <List key={item._id}>
                <List.Item key={item._id+1}> {item.date.split('T')[0].split('-').reverse().join('/')} </List.Item>
                <List.Item key={item._id+2}> {item.description} </List.Item>
                <List.Item key={item._id+3}> {item.duration ? item.duration + ' mins' : ''} </List.Item>
                <List.Item key={item._id+4}> {item.reps ? item.reps + ' reps' : ''} </List.Item>
                <List.Item key={item._id+5}> {item.weight ? item.weight + ' kgs' : ''} </List.Item>
              <hr />
              </List>
            )}
          </Modal.Content>
        </Modal>
      </Form> 
    )
  }
}
