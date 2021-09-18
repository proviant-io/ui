import {
	ACTION_CREATE_API_TOKEN_FAIL,
	ACTION_CREATE_API_TOKEN_SENDING,
	ACTION_CREATE_API_TOKEN_SUCCESS,
	ACTION_CREATE_SHOPPING_LIST_ITEM_RESET
} from '../const'
import { generateAuthApiUrl } from '../../../utils/link'
import { generateLocaleHeader } from '../../../utils/i18n'
import axios from 'axios'

const sending = () => {
	return {
		type: ACTION_CREATE_API_TOKEN_SENDING
	}
}

const fail = error => {
	return {
		type: ACTION_CREATE_API_TOKEN_FAIL,
		error: error
	}
}

const success = payload => {
	return {
		type: ACTION_CREATE_API_TOKEN_SUCCESS,
		payload: payload
	}
}

export const shoppingFormReset = () => {
	return {
		type: ACTION_CREATE_SHOPPING_LIST_ITEM_RESET
	}
}

export const apiTokenSubmitForm = (locale) => {
	const json = JSON.stringify({})
	return (dispatch) => {
		dispatch(sending())
		axios.post(generateAuthApiUrl('/api-token/'), json, generateLocaleHeader(locale))
			.then(response => {
				const data = response.data
				dispatch(success(data.data))
			})
			.catch(error => {
				if (error.response && error.response.status) {
					dispatch(fail(error.response.data.error))
				} else {
					dispatch(fail(error.message))
				}
			})
	}
}
