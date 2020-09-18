import React, { Component } from 'react'
import { DragDropContext,Droppable } from 'react-beautiful-dnd';


export class Demo extends Component {





  render() {
    return (
      <DragDropContext>
        <div>Hello world</div>
      </DragDropContext>
    );
  }
}