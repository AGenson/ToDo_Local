
import * as types from "./constants";

export function count_increment() {
	return (dispatch, state) => {
		dispatch({
			type: types.COUNT_INCREMENT
		});
	};
};

export function count_decrement() {
	return (dispatch, state) => {
		dispatch({
			type: types.COUNT_DECREMENT
		});
	};
};
