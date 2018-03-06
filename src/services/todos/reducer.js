import * as types from "./constants";


const initialState = {
	items: [],
	filter: types.TODOS_FILTER_ALL
};


export default function reducer(state = initialState, action)
{
	var {items} = state;
	var todo = {};

	switch (action.type) {

		case types.TODOS_ADD_TODO:
			todo = {
				id: Date.now(),
				name: action.payload.text,
				completed: false
			};

			console.log(types.TODOS_ADD_TODO, " - ", todo);
			items.push(todo);

			return {
				...state,
				items: items
			};

		case types.TODOS_EDIT_TODO:
			items.map((elt) => {
				if (action.payload.id === elt.id){
					elt.name = action.payload.text;
					console.log(types.TODOS_EDIT_TODO, " - ", elt);
				}

				return elt;
			});

			return {
				...state,
				items: items
			};

		case types.TODOS_CHECK_TODO:
			var index = -1;

			items.forEach( (item, i, arr) => {
				if (item.id === action.payload){
					arr[i].completed = !item.completed;
					index = i;
				}
			});

			console.log(types.TODOS_CHECK_TODO, " - ", items[index]);

			return {
				...state,
				items: items
			};

		case types.TODOS_REMOVE_TODO:
			items.forEach( (item, i, arr) => {
				if (item.id === action.payload){
					todo = item;
					arr.splice(i, 1);
				}
			});

			console.log(types.TODOS_REMOVE_TODO, " - ", todo);

			return {
				...state,
				items: items
			};

		case types.TODOS_CHANGE_FILTER:
			var {filter} = state;

			console.log(types.TODOS_CHANGE_FILTER, " - ", action.payload);
			filter = action.payload;

			return {
				...state,
				filter: filter
			};

		default:
			return state;

	}
};
