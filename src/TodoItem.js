import React, { Component } from 'react';

class TodoItem extends Component {
  constructor() {
    super()
    this.state = {
      editMode: false
    }
  }
  toggleEdit = e => {
    e.preventDefault();
    this.setState({ editMode: !this.state.editMode });
  }

  callUpdateAPI = (e,title) => {
      e.preventDefault();
      if (e.keyCode === 13) {
        this.props.editItem(title,this.props.item._id);
        this.toggleEdit(e);
      }
  }

  render() {
      const item = this.props.item;
      return (
        <li key={item._id}>
          {!this.state.editMode ? <span>{item.title}</span>
          :
            <input
                defaultValue={item.title}
                ref={c => {
                    this.inputElement = c;
                }}
                onKeyUp = {e => { this.callUpdateAPI(e,e.target.value) }}
            />
      }{!this.state.editMode ?<button type='submit' onClick={this.toggleEdit}>Edit Task</button>: <button type='submit' onClick={e => { this.props.editItem(this.inputElement.value,this.props.item._id); this.toggleEdit(e); }}>Update</button>} <button type='submit' onClick={() => this.props.deleteItem(item._id)}>Delete Task</button>
        </li>
      )
    }
}

export default TodoItem