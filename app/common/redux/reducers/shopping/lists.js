import {
	ACTION_FETCH_SHOPPING_LISTS_FAIL,
	ACTION_FETCH_SHOPPING_LISTS_LOADING,
	ACTION_FETCH_SHOPPING_LISTS_SUCCESS, ACTION_FETCH_SHOPPING_RESET
} from '../../actions/const'
import { STATUS_DEFAULT, STATUS_FETCH_FAILED, STATUS_LOADED, STATUS_LOADING } from '../consts'

const initialState = () => {
	return {
		items: [],
		status: STATUS_DEFAULT,
		error: null
	}
}

export default function (state = initialState(), action) {
	switch (action.type) {
	case ACTION_FETCH_SHOPPING_RESET:
		return {
			...initialState()
		}
	case ACTION_FETCH_SHOPPING_LISTS_LOADING:
		return {
			...state,
			status: STATUS_LOADING,
			error: null
		}
	case ACTION_FETCH_SHOPPING_LISTS_FAIL:
		return {
			...state,
			status: STATUS_FETCH_FAILED,
			error: action.error
		}
	case ACTION_FETCH_SHOPPING_LISTS_SUCCESS:
		return {
			...state,
			status: STATUS_LOADED,
			error: null,
			items: action.payload
		}
	default:
		return state
	}
}
