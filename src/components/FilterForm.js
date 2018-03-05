import React from 'react';
import '../App.css';

import { TODOS_FILTER_ALL, TODOS_FILTER_TODO, TODOS_FILTER_COMPLETED } from "../services/todos/constants";



const ToDoForm = (props) => (
	<span id="filters">
		<button
			className={"filter"+(props.filter === TODOS_FILTER_ALL ? " selected" : "")}
			onClick={() => props.changeFilter(TODOS_FILTER_ALL)}
		>
			All
		</button>
		<button
			className={"filter"+(props.filter === TODOS_FILTER_TODO ? " selected" : "")}
			onClick={() => props.changeFilter(TODOS_FILTER_TODO)}
		>
			Todos
		</button>
		<button
			className={"filter"+(props.filter === TODOS_FILTER_COMPLETED ? " selected" : "")}
			onClick={() => props.changeFilter(TODOS_FILTER_COMPLETED)}
		>
			Completed
		</button>
	</span>
);



export default ToDoForm;
