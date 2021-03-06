import {
	ACTION_ADD_PRODUCT_IN_LIST,
	ACTION_AMEND_PRODUCT_STOCK_IN_LIST,
	ACTION_DELETE_PRODUCT_IN_LIST,
	ACTION_FETCH_PRODUCTS_FAIL,
	ACTION_FETCH_PRODUCTS_LOADING,
	ACTION_FETCH_PRODUCTS_SUCCESS,
	ACTION_UPDATE_PRODUCT_IN_LIST,
	ACTION_UPDATE_PRODUCT_STOCK_IN_LIST
} from '../const'
import { generateCoreApiUrl, generateHeaders } from '../../../utils/link'
import { handleError } from '../../../utils/action'
import axios from 'axios'

const fetchProductLoading = () => {
	return {
		type: ACTION_FETCH_PRODUCTS_LOADING
	}
}

const fetchProductFail = error => {
	return {
		type: ACTION_FETCH_PRODUCTS_FAIL,
		error: error
	}
}

const fetchProductSuccess = payload => {
	return {
		type: ACTION_FETCH_PRODUCTS_SUCCESS,
		payload: payload
	}
}

export const deleteProductInList = (id) => {
	return {
		type: ACTION_DELETE_PRODUCT_IN_LIST,
		id
	}
}

export const updateProductInList = (item) => {
	return {
		type: ACTION_UPDATE_PRODUCT_IN_LIST,
		item
	}
}

export const addProductInList = (item) => {
	return {
		type: ACTION_ADD_PRODUCT_IN_LIST,
		item
	}
}

export const updateProductStockInList = (productId, items) => {
	return {
		type: ACTION_UPDATE_PRODUCT_STOCK_IN_LIST,
		productId,
		items
	}
}

export const amendProductStockInList = (productId, delta) => {
	return {
		type: ACTION_AMEND_PRODUCT_STOCK_IN_LIST,
		productId,
		delta
	}
}

export const fetchProducts = (query, locale) => {
	let queryString = ''

	const esc = encodeURIComponent
	if (query != null) {
		queryString = '?' + Object.keys(query)
			.map(k => esc(k) + '=' + esc(query[k]))
			.join('&')
	}

	return (dispatch) => {
		dispatch(fetchProductLoading())
		generateHeaders(locale).then(headers => {
			axios.get(generateCoreApiUrl(`/product/${queryString}`), headers)
				.then(response => {
					const data = response.data
					dispatch(fetchProductSuccess(data.data))
				})
				.catch(error => {
					handleError(dispatch, error, fetchProductFail, fetchProductFail, fetchProductFail)
				})
		})
	}
}
