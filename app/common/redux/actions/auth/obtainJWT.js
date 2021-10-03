import { fetchUser } from '../user'
import { generateAuthApiUrl, generateHeaders } from '../../../utils/link'
import { saveJWT } from '../../../utils/security'
import axios from 'axios'

export const obtainJWT = (linkId, locale) => {
	return (dispatch) => {
		generateHeaders(locale).then(headers => {
			axios.get(generateAuthApiUrl(`/app/${linkId}/`), headers)
				.then(response => {
					const data = response.data
					saveJWT(data.data).then(() => {
						dispatch(fetchUser(locale))
					})
				})
				.catch(error => {
					const errorMsq = error.message
					console.error('obtainJWT', errorMsq)
				})
		})
	}
}
