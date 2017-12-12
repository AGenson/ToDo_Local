import * as types from "./constants";


const initialState = {
	value: 0,
};

export default function reducer(state = initialState, action)
{
	switch(action.type)
	{

		case types.COUNT_INCREMENT:
			return {
				...state,
				value: state.value + 1
			};

		case types.COUNT_DECREMENT:
			return {
				...state,
				value: state.value - 1
			};

		default:
			return state;
	}
};
