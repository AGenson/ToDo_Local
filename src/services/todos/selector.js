import * as types from "./constants";


export default function todos_filter(state)
{
	var {items} = state.todos;
	switch (state.todos.filter) {

		case types.TODOS_FILTER_ALL:
			return get_todos(items).concat(get_todos_completed(items));

		case types.TODOS_FILTER_TODO:
			return get_todos(items);

		case types.TODOS_FILTER_COMPLETED:
			return get_todos_completed(items);

		default:
			return state;

	}
};



function get_todos(items){
	return items.filter((obj) => !obj.completed);
}



function get_todos_completed(items){
	return items.filter((obj) => obj.completed);
}
