import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header/Header';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon/Icon';
import List from 'semantic-ui-react/dist/commonjs/elements/List/List';

class App extends Component { // Approach is now class [from Function]; no change - output
    state = {
      values: []
    }
    // Hard-code [{id: 1,name: 'Value 101'},{id: 2,name: 'Value 102'}]/ Now "axios.response"
    componentDidMount() {
        axios.get('http://localhost:5000/api/values')
            .then((response) => {
              // console.log(response);
              this.setState( {
                  values: response.data
              })
            })
    }

    render(){  
        return (
          <div>
            <Header as="h2">
              <Icon name='users' />
              <Header.Content>Reactivities</Header.Content>
            </Header>
            <List bulleted>
                {this.state.values.map((value: any) => (
                      <List.Item key={value.id}>{value.name}</List.Item>
                  ))}
            </List>
          </div>
        );
    }
}

export default App;
