import * as React from 'react'
import { FILTER_TYPE_CATEGORY, FILTER_TYPE_LIST, FILTER_TYPE_NONE } from '../../const'
import { Icon } from '@blueprintjs/core'
import { useHistory } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import ProductsTags from './ProductTags'
import PropTypes from 'prop-types'

const ProductsListRow = (
	{
		product,
		categories,
		lists,
		filterType,
		i18n,
		listOrCategoryId
	}) => {
	const history = useHistory()
	const list = lists.items.find(item => item.id === product.list_id)

	const categoriesFound = []

	if (product.category_ids) {
		product.category_ids.forEach((categoryId) => {
			const category = categories.items.find(item => item.id === categoryId)
			if (category != null) {
				categoriesFound.push(category)
			}
		})
	}

	const onClickHandler = () => {
		switch (filterType) {
		case FILTER_TYPE_LIST:
			history.push('/list/' + listOrCategoryId + '/product/' + product.id)
			break
		case FILTER_TYPE_CATEGORY:
			history.push('/category/' + listOrCategoryId + '/product/' + product.id)
			break
		case FILTER_TYPE_NONE:
			history.push('/product/' + product.id)
			break
		default:
		}
	}

	const imageStyle = {
		backgroundImage: 'url(' + product.image + ')'
	}

	let extraClasses = ''

	if (Number(product.stock) === 0) {
		extraClasses += ' product-row__no-stock'
	}

	return (
		<div className={'product-list__product-row product-row ' + extraClasses} onClick={onClickHandler}>
			<div className="product-row__product-designation">
				<div className='product-row__image' style={imageStyle}>
				</div>
				<div className="product-row__product-stock product-stock-icon">
					<Icon className='product-stock-icon__icon' icon={'cube'}/>
					{product.stock}
				</div>
				<div className="product-row__product-price product-stock-price">
					<Icon className='product-price-icon__icon' icon={'dollar'}/>
					{product.price}
				</div>
				<span className="product-row__product-title">{product.title}</span>
			</div>
			<ProductsTags list={list} categories={categoriesFound} className="product-row__product-sorting"/>
		</div>
	)
}

ProductsListRow.propTypes = {
	product: PropTypes.object,
	categories: PropTypes.object,
	lists: PropTypes.object,
	filterType: PropTypes.string,
	listOrCategoryId: PropTypes.number,
	i18n: PropTypes.object
}

export default withTranslation('translations')(ProductsListRow)
