import React, { Component } from 'react';
import './App.css';

class CardLayout extends Component {
  constructor(props) {
      super(props);
      this.state = {
        tasks: [
            {id: "1", items:"Paratha side dish (2 nos), Plain Dosa (1 nos), Butter Roti (5 nos)", type:"inProgress", orderNo: "#2"},
            {id: "2", items:"Paratha side dish (2 nos), Plain Dosa (1 nos), Butter Roti (5 nos)", type:"inProgress", orderNo:"#3"},
            {id: "3", items:"Paratha side dish (2 nos), Plain Dosa (1 nos), Butter Roti (5 nos)", type:"done", orderNo:"#4"},
            {id: "4", items:"Paratha side dish (2 nos), Plain Dosa (1 nos), Butter Roti (5 nos)", type:"done", orderNo:"#5"},
            {id: "5", items:"Paratha side dish (2 nos), Plain Dosa (1 nos), Butter Roti (5 nos)", type:"done", orderNo:"#6"},
          ]
      }
  }

onDragStart = (event, data) => {
  event.dataTransfer.setData("orderNo", data.id);
  this.dragged = event.currentTarget;
}

onDragOver = (event) => {
  event.preventDefault();
  this.over = event.target;
}

onDrop = (event, type) => {
  const {tasks} = this.state;
    let orderNo = event.dataTransfer.getData("orderNo");
    let cardDetails = tasks.filter((task) => {
        if (task.id === orderNo) {
            task.type = type;
        }
        return task;
    });
    this.setState({
        ...this.state,
        tasks: cardDetails,
    });
}

dragEnd = (event) => {
  let data = this.state.tasks;
  let from = Number(this.dragged.dataset.id);
  let to = Number(this.over.dataset.id);
  console.log('Completed', this.dragged, this.over);
  data.splice(to, 0, data.splice(from, 1)[0]);
  this.setState({tasks: data});
}

render() {
  const {tasks} = this.state;
  const cards = {
      inProgress: [],
      done: [],
    }

  tasks.forEach ((data, index) => {
    if (cards[data.type] !== undefined) {
      cards[data.type].push(
      <div key={index} 
        data-id={index}
        onDragStart = {(event) => this.onDragStart(event, data )}
        onDragEnd={this.dragEnd.bind(this)}
        draggable
        className= {`draggable_${data.type}`}
        >
          <div>
            {data.orderNo}
          </div>
          <div>
           {data.items}
          </div>
      </div>
    );
  }
  });

    return (
      <div className="drag-container">
        <div className="inProgress"
          onDragOver={(event)=>this.onDragOver(event)}
          onDrop={(event)=>{this.onDrop(event, "inProgress")}}>
            <span className="group-header"><b>In Progress</b></span>
            {cards.inProgress}
        </div>
        <div className="droppable"
          onDragOver={(event)=>this.onDragOver(event)}
            onDrop={(event)=>this.onDrop(event, "done")}>
          <span className="group-header"><b>Completed</b></span>
          {cards.done}
        </div>	        
      </div>
    );
  }
}

export default CardLayout;
