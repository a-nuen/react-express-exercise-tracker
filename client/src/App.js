import React, { Component } from 'react'
import UserForm from './UserForm'
import { Header, Segment, Container } from 'semantic-ui-react'
import SignUpForm from './SignUpForm'
import LogHistoryForm from './LogHistoryForm'
class App extends Component {
  render() {
    return (
      <div style={{maxWidth: 500, margin: '0 auto'}}  >
        <Container>
          <Segment>
            <Header as='h1' textAlign='center'>
              Exercise Tracker
            </Header>
          </Segment>
          <Segment>
            <SignUpForm />
          </Segment>
          <Segment>
            <UserForm />
          </Segment>
          <Segment>
            <LogHistoryForm />
          </Segment>
        </Container>
      </div>
    );
  }
}

export default App;
