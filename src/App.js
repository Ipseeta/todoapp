import React, { Component } from 'react';
import TodoItems from './TodoItems';
import fetch from 'isomorphic-fetch';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      items: [],
      currentItem: {title:''},
    }
  }
  componentDidMount = async () => {
    const response = await fetch('https://b3tcfb1z62.execute-api.us-east-1.amazonaws.com/dev/api/todos', {
      headers: {
				accept: 'application/json',
				'Content-Type': 'application/json',
				'User-Agent': 'todo',
			},
      method:'GET'
    });
    const json = await response.json();
    this.setState({items : json});
  }
  
  handleInput = e => {
    const itemText = e.target.value;
    const currentItem = { title: itemText }
    this.setState({
      currentItem
    })
  }

  addItem = async(e) => {
    e.preventDefault();
    const newItem = this.state.currentItem;
    if (newItem.title !== '') {
      const response = await fetch('https://b3tcfb1z62.execute-api.us-east-1.amazonaws.com/dev/api/todos', {
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            'User-Agent': 'todo',
          },
          body: JSON.stringify({title: newItem.title}),
          method:'POST'
        });
      const json = await response.json();
      const items = this.state.items;
      items.unshift(json);
      this.setState({ items: items });
      this.inputElement.value = '';
    }
  }

  editItem = async (title,id) => {
    const response = await fetch(`https://b3tcfb1z62.execute-api.us-east-1.amazonaws.com/dev/api/todos/${id}`, {
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            'User-Agent': 'todo',
          },
          body: JSON.stringify({ title: title }),
          method:'PUT'
        });
    const json = await response.json();
    this.state.items.forEach(item => {
      if(item._id === json._id) {
        item.title = json.title;
      }
    });
    this.setState({ items: this.state.items});
  }

  deleteItem = async(id) => {
    const filteredItems = this.state.items.filter(item => {
      return item._id !== id
    })
    const response = await fetch(`https://b3tcfb1z62.execute-api.us-east-1.amazonaws.com/dev/api/todos/${id}`, {
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            'User-Agent': 'todo',
          },
          method:'DELETE'
        })
    const json = await response.json();
    if (json.deletedCount === 1) {
      this.setState({ items: filteredItems});
    }
  }
  render() {
    return (
      <div className="App">
        <div>
          <div>
            <input
                  placeholder="Enter Task"
                  ref={c => {
                    this.inputElement = c;
                  }}
                  value={this.state.currentItem.text}
                  onChange={this.handleInput}
            />
            <button onClick={this.addItem}>Add Task</button>
          </div>
        </div>
        <TodoItems entries={this.state.items} editItem={this.editItem} deleteItem={this.deleteItem}/>
      </div>
    );
  }
}

export default App;
