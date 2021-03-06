import {
	ACTION_DELETE_CATEGORY_FAIL,
	ACTION_DELETE_CATEGORY_IN_LIST,
	ACTION_DELETE_CATEGORY_SUCCESS,
	ACTION_EDIT_CATEGORY_FAIL,
	ACTION_EDIT_CATEGORY_FETCH_FAIL,
	ACTION_EDIT_CATEGORY_FETCHED,
	ACTION_EDIT_CATEGORY_FETCHING,
	ACTION_EDIT_CATEGORY_RESET,
	ACTION_EDIT_CATEGORY_SENDING,
	ACTION_EDIT_CATEGORY_SUCCESS
} from '../const'
import { generateCoreApiUrl, generateHeaders } from '../../../utils/link'
import { handleError } from '../../../utils/action'
import { updateCategoryInList } from './categories'
import axios from 'axios'

const editCategorySending = () => {
	return {
		type: ACTION_EDIT_CATEGORY_SENDING
	}
}
const editCategorySuccess = (model) => {
	return {
		type: ACTION_EDIT_CATEGORY_SUCCESS,
		model: model
	}
}
const editCategoryFetching = () => {
	return {
		type: ACTION_EDIT_CATEGORY_FETCHING
	}
}
const editCategoryFetched = (model) => {
	return {
		type: ACTION_EDIT_CATEGORY_FETCHED,
		model: model
	}
}
const editCategoryFetchFail = (error) => {
	return {
		type: ACTION_EDIT_CATEGORY_FETCH_FAIL,
		error: error
	}
}
const editCategoryFail = (error) => {
	return {
		type: ACTION_EDIT_CATEGORY_FAIL,
		error: error
	}
}
const deleteCategorySuccess = (error) => {
	return {
		type: ACTION_DELETE_CATEGORY_SUCCESS,
		error: error
	}
}
const deleteCategoryInList = (id) => {
	return {
		type: ACTION_DELETE_CATEGORY_IN_LIST,
		id
	}
}
const deleteCategoryFail = (error) => {
	return {
		type: ACTION_DELETE_CATEGORY_FAIL,
		error: error
	}
}

export const editCategoryReset = (error) => {
	return {
		type: ACTION_EDIT_CATEGORY_RESET,
		error: error
	}
}

export const fetchEditCategory = (id, locale) => {
	return (dispatch) => {
		dispatch(editCategoryFetching())
		generateHeaders(locale).then(headers => {
			axios.get(generateCoreApiUrl(`/category/${id}/`), headers)
				.then(response => {
					const data = response.data
					dispatch(editCategoryFetched(data.data))
				})
				.catch(error => {
					handleError(dispatch, error, editCategoryFetchFail, editCategoryFetchFail, editCategoryFetchFail)
				})
		})
	}
}

export const updateCategory = (id, title, locale) => {
	return (dispatch) => {
		dispatch(editCategorySending())
		const json = JSON.stringify({
			id, title
		})
		generateHeaders(locale).then(headers => {
			axios.put(generateCoreApiUrl(`/category/${id}/`), json, headers)
				.then(response => {
					const data = response.data
					dispatch(editCategorySuccess(data.data))
					dispatch(updateCategoryInList(data.data))
				})
				.catch(error => {
					handleError(dispatch, error, editCategoryFail, editCategoryFail, editCategoryFail)
				})
		})
	}
}

export const deleteCategory = (id, locale) => {
	return (dispatch) => {
		generateHeaders(locale).then(headers => {
			axios.delete(generateCoreApiUrl(`/category/${id}/`), headers)
				.then(response => {
					const data = response.data
					dispatch(deleteCategorySuccess(data.data))
					dispatch(deleteCategoryInList(id))
				})
				.catch(error => {
					handleError(dispatch, error, deleteCategoryFail, deleteCategoryFail, deleteCategoryFail)
				})
		})
	}
}
