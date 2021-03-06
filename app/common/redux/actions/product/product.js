import {
	ACTION_AMEND_PRODUCT_STOCK,
	ACTION_DELETE_PRODUCT_FAIL,
	ACTION_DELETE_PRODUCT_LOADING,
	ACTION_DELETE_PRODUCT_SUCCESS,
	ACTION_FETCH_PRODUCT_FAIL,
	ACTION_FETCH_PRODUCT_LOADING,
	ACTION_FETCH_PRODUCT_NOT_FOUND,
	ACTION_FETCH_PRODUCT_SUCCESS,
	ACTION_RESET_PRODUCT,
	ACTION_UPDATE_PRODUCT_STOCK
} from '../const'
import { deleteProductInList } from './products'
import { generateCoreApiUrl, generateHeaders } from '../../../utils/link'
import { handleError } from '../../../utils/action'
import axios from 'axios'

const fetchProductLoading = () => {
	return {
		type: ACTION_FETCH_PRODUCT_LOADING
	}
}

const fetchProductFail = error => {
	return {
		type: ACTION_FETCH_PRODUCT_FAIL,
		error: error
	}
}
const fetchProductNotFound = error => {
	return {
		type: ACTION_FETCH_PRODUCT_NOT_FOUND,
		error: error
	}
}

const fetchProductSuccess = model => {
	return {
		type: ACTION_FETCH_PRODUCT_SUCCESS,
		model: model
	}
}

const deleteProductSuccess = (model) => {
	return {
		type: ACTION_DELETE_PRODUCT_SUCCESS,
		model: model
	}
}
const deleteProductFail = (error) => {
	return {
		type: ACTION_DELETE_PRODUCT_FAIL,
		error: error
	}
}

const deleteProductLoading = () => {
	return {
		type: ACTION_DELETE_PRODUCT_LOADING
	}
}

export const resetProduct = () => {
	return {
		type: ACTION_RESET_PRODUCT
	}
}

export const updateProductStock = (productId, items) => {
	return {
		type: ACTION_UPDATE_PRODUCT_STOCK,
		productId,
		items
	}
}

export const amendProductStock = (productId, delta) => {
	return {
		type: ACTION_AMEND_PRODUCT_STOCK,
		productId,
		delta
	}
}

export const fetchProduct = (id, locale) => {
	return (dispatch) => {
		dispatch(fetchProductLoading())
		generateHeaders(locale).then(headers => {
			axios.get(generateCoreApiUrl(`/product/${id}/`), headers)
				.then(response => {
					const data = response.data
					dispatch(fetchProductSuccess(data.data))
				})
				.catch(error => {
					handleError(dispatch, error, fetchProductFail, fetchProductNotFound, fetchProductFail)
				})
		})
	}
}

export const deleteProduct = (id, locale) => {
	return (dispatch) => {
		dispatch(deleteProductLoading())
		generateHeaders(locale).then(headers => {
			axios.delete(generateCoreApiUrl(`/product/${id}/`), headers)
				.then(response => {
					dispatch(deleteProductSuccess())
					dispatch(deleteProductInList(id))
				})
				.catch(error => {
					handleError(dispatch, error, deleteProductFail, deleteProductFail, deleteProductFail)
				})
		})
	}
}
