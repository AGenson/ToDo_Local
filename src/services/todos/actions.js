
import * as types from "./constants";

export function todos_add_todo(payload) {
	return (dispatch, state) => {

		dispatch({
			type: types.TODOS_ADD_TODO,
			payload: payload
		});
	}
}

export function todos_edit_todo(payload) {
	return (dispatch, state) => {

		dispatch({
			type: types.TODOS_EDIT_TODO,
			payload: payload
		});
	}
}

export function todos_check_todo(payload) {
	return (dispatch, state) => {
		dispatch({
			type: types.TODOS_CHECK_TODO,
			payload: payload
		});
	}
}

export function todos_remove_todo(payload) {
	return (dispatch, state) => {
		dispatch({
			type: types.TODOS_REMOVE_TODO,
			payload: payload
		});
	}
}

export function todos_change_filter(payload) {
	return (dispatch, state) => {
		dispatch({
			type: types.TODOS_CHANGE_FILTER,
			payload: payload
		});
	}
}
