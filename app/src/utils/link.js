import { FILTER_TYPE_CATEGORY, FILTER_TYPE_LIST, FILTER_TYPE_NONE } from '../const'

const CATEGORY_REGEX = /\/category\/(\d*)/
const LIST_REGEX = /\/list\/(\d*)/
export const ROUTE_ROOT = 'root'
export const ROUTE_CATEGORY = 'category'
export const ROUTE_LIST = 'list'

export const parseLocationFromUri = (path) => {
	if (CATEGORY_REGEX.test(path)) {
		const result = path.match(CATEGORY_REGEX)

		if (result.length > 1) {
			return {
				route: ROUTE_CATEGORY,
				id: Number(result[1])
			}
		}
	}

	if (LIST_REGEX.test(path)) {
		const result = path.match(LIST_REGEX)

		if (result.length > 1) {
			return {
				route: ROUTE_LIST,
				id: Number(result[1])
			}
		}
	}

	return {
		route: ROUTE_ROOT
	}
}

export const generateEditProductLink = (filterType, listOrCategoryId, productId) => {
	switch (filterType) {
	case FILTER_TYPE_CATEGORY:
		return '/category/' + listOrCategoryId + '/product-edit/' + productId
	case FILTER_TYPE_LIST:
		return '/list/' + listOrCategoryId + '/product-edit/' + productId
	case FILTER_TYPE_NONE:
		return '/product-edit/' + productId
	default:
		console.error('unexpected filter type')
	}
}

export const generateProductLink = (filterType, listOrCategoryId, productId) => {
	switch (filterType) {
	case FILTER_TYPE_CATEGORY:
		return '/category/' + listOrCategoryId + '/product/' + productId
	case FILTER_TYPE_LIST:
		return '/list/' + listOrCategoryId + '/product/' + productId
	case FILTER_TYPE_NONE:
		return '/product/' + productId
	default:
		console.error('unexpected filter type')
	}
}

export const generateNewProductLink = (filterType, listOrCategoryId) => {
	switch (filterType) {
	case FILTER_TYPE_CATEGORY:
		return '/category/' + listOrCategoryId + '/product-new'
	case FILTER_TYPE_LIST:
		return '/list/' + listOrCategoryId + '/product-new'
	case FILTER_TYPE_NONE:
		return '/product-new'
	default:
		console.error('unexpected filter type')
	}
}

export const generateListLink = (listId) => {
	return '/list/' + listId
}

export const generateCategoryLink = (listId) => {
	return '/category/' + listId
}
