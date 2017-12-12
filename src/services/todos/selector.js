import * as types from "./constants";


export default function todos_filter(state)
{
	var {items} = state.todos;
	switch (state.todos.filter) {

		case types.TODOS_FILTER_ALL:
			return items;

		case types.TODOS_FILTER_TODO:
			return items.filter((obj) => !obj.completed);

		case types.TODOS_FILTER_COMPLETED:
			return items.filter((obj) => obj.completed);

		default:
			return state;

	}
};