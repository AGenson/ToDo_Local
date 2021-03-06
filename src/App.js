import React, { Component } from 'react';
import circle from './circle.png';
import './App.css';

import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import ToDoForm from "./components/ToDoForm";
import FilterForm from "./components/FilterForm";
import ToDoDisplay from "./components/ToDoDisplay";

import { count_increment, count_decrement } from "./services/count/actions";
import { todos_add_todo, todos_edit_todo, todos_check_todo, todos_remove_todo, todos_change_filter } from "./services/todos/actions";
import todos_filter from "./services/todos/selector";
import { TODOS_FILTER_COMPLETED } from "./services/todos/constants";



class App extends Component {

	state = {
		text_create: "",
		edit: {
			status_edit: false,
			id_edit: "",
			text_edit: ""
		}
	}

	componentDidMount() {
		this.interval = setInterval(() => {
			this.props.items.forEach((item) => {
				var input = document.getElementById("check-"+item.id);

				if (input !== null){
					document.getElementById("check-"+item.id).checked = item.completed;
				}
			});
		}, 500);
	}

	componentWillUnmount() {
		if (this.interval) {
			clearInterval(this.interval);
		}
	}

	_onChange_text_create(e) {
		if (e.target.value.length < 37){
			this.setState({
				text_create: e.target.value
			});
		}
	}

	_onValid_text_create(){
		if (this.state.text_create.length > 0){
			this.props.todos_add_todo({ text: this.state.text_create });
			this.setState({
				text_create: ""
			});
			this.props.count_increment();
		}
	}

	_onStart_text_edit(e, id, name) {
		if (this.state.edit.status_edit === false){
			var edit_init = {
				status_edit: true,
				id_edit: id,
				text_edit: name
			};

			this.setState({
				edit: edit_init
			});
		}
		else{
			console.log("_onStart_text_edit : A ToDo is already in edition");
		}
	}

	_onChange_text_edit(e) {
		var edit = this.state.edit;
		edit.text_edit = e.target.value;

		if (e.target.value.length < 37){
			this.setState({
				edit: edit
			});
		}
	}

	_onValid_text_edit(){
		this.props.todos_edit_todo({ id: this.state.edit.id_edit, text: this.state.edit.text_edit });
		this._reset_edit();
	}

	_onChange_filter(filter){
		this.props.todos_change_filter(filter);
		this._reset_edit();
	}

	_reset_edit(){
		var init_edit = {
			status_edit: false,
			id_edit: "",
			text_edit: ""
		};

		this.setState({
			edit: init_edit
		});
	}

	_onCheck(id, completed){
		if (completed === true)
			this.props.count_increment();
		else
			this.props.count_decrement();

		this.props.todos_check_todo(id);
	}

	_onRemove(id, completed){
		this.props.todos_remove_todo(id);

		if (completed === false)
			this.props.count_decrement();
	}

	render() {
		return (
			<div className="App">
				<div id="header">
					<span id="intro">
						<h2 id="h2-1">ToDo</h2>
						<img src={circle} className="App-logo" alt="logo" />
						<span id="count_todos">
							{this.props.count_value}
						</span>
						<h2 id="h2-2">List</h2>
					</span>
					<ToDoForm
						text={this.state.text_create}
						onChangeText={this._onChange_text_create.bind(this)}
						onValidText={this._onValid_text_create.bind(this)}
					/>
				</div>
				<div id="body">
					<ul>
						<li>
							<FilterForm
								filter={this.props.filter}
								changeFilter={this._onChange_filter.bind(this)}
							/>
						</li>
						{
							this.props.items.length === 0 ?
								this.props.filter === TODOS_FILTER_COMPLETED ?
									<div id="no_todo">
										Sorry mate ! Nothing is completed !
									</div>
								:
									<div id="no_todo">
										Great ! There's nothing to do !
									</div>
							:
								this.props.items.map((item, i) => {
									return (
										<ToDoDisplay
											{... item}
											{... this.state.edit}
											text={this.state.edit.text_edit}
											key={item.id}
											index={i}
											onStartEdit={this._onStart_text_edit.bind(this)}
											onChangeText={this._onChange_text_edit.bind(this)}
											onValidText={this._onValid_text_edit.bind(this)}
											changeStateToDo={this._onCheck.bind(this)}
											removeToDo={ () => this._onRemove(item.id, item.completed) }
										/>
									);
								})
						}
					</ul>
				</div>
			</div>
		);
	}

}


const mapStateToProps = (state) => ({
	filter: state.todos.filter,
	items: todos_filter(state),
	count_value: state.count.value
});


const mapActionsToProps = (dispatch) => ({
	todos_add_todo: bindActionCreators(todos_add_todo, dispatch),
	todos_edit_todo: bindActionCreators(todos_edit_todo, dispatch),
	todos_check_todo: bindActionCreators(todos_check_todo, dispatch),
	todos_remove_todo: bindActionCreators(todos_remove_todo, dispatch),

	todos_change_filter: bindActionCreators(todos_change_filter, dispatch),

	count_increment: bindActionCreators(count_increment, dispatch),
	count_decrement: bindActionCreators(count_decrement, dispatch)
});


export default connect(mapStateToProps, mapActionsToProps)( App );
