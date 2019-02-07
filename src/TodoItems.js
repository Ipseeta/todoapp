import React, { Component } from 'react';
import TodoItem from './TodoItem';

class TodoItems extends Component {
  constructor() {
    super()
    this.state = {
      listItems: []
    }
  }
    
  render() {
    const todoEntries = this.props.entries
    const listitems = todoEntries.map((item) => {
      return (
        <TodoItem key={item._id} item={item} editItem = {this.props.editItem} deleteItem= {this.props.deleteItem}/>
      )
    });

    return <ul>{listitems}</ul>
  }
}

export default TodoItems