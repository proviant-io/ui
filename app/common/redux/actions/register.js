import {
	ACTION_USER_REGISTER_EMAIL_SENT,
	ACTION_USER_REGISTER_FAIL,
	ACTION_USER_REGISTER_RESET,
	ACTION_USER_REGISTER_SENDING,
	ACTION_USER_UNAUTHORIZED
} from './const'
import { generateAuthApiUrl, generateHeaders } from '../../utils/link'
import { handleError } from '../../utils/action'
import { validateEmail } from '../../validators/user'
import axios from 'axios'

export const userUnauthorized = () => {
	return {
		type: ACTION_USER_UNAUTHORIZED
	}
}

const registerFail = (error) => {
	return {
		type: ACTION_USER_REGISTER_FAIL,
		error
	}
}

const registerSending = () => {
	return {
		type: ACTION_USER_REGISTER_SENDING
	}
}

const registerEmailSent = () => {
	return {
		type: ACTION_USER_REGISTER_EMAIL_SENT
	}
}

export const registerReset = () => {
	return {
		type: ACTION_USER_REGISTER_RESET
	}
}

export const actionRegister = (email, password, locale) => {
	return (dispatch) => {
		const error = validateEmail(email)

		if (error) {
			dispatch(registerFail(error))
			return
		}

		dispatch(registerSending())
		const json = JSON.stringify({
			email,
			password
		})
		generateHeaders(locale).then(headers => {
			axios.post(generateAuthApiUrl('/register/'), json, headers)
				.then(response => {
					dispatch(registerEmailSent())
				})
				.catch(error => {
					handleError(dispatch, error, registerFail, registerFail, registerFail)
				})
		})
	}
}
