import * as React from 'react'
import { Callout, Intent } from '@blueprintjs/core'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { getShoppingForm } from '../../../common/redux/selectors'
import { shoppingFormSubmit } from '../../../common/redux/actions/shopping/form'
import { STATUS_CREATED, STATUS_DEFAULT, STATUS_ERROR } from '../../../common/redux/reducers/consts'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import AddItemForm from '../header/AddItemForm'
import PropTypes from 'prop-types'

const ShoppingQuickAddForm = ({ submitForm, error, listId, status, t, className }) => {
	const history = useHistory()

	const [title, setTitle] = useState('')
	const [quantity, setQuantity] = useState(1)
	const [errorInternal, setErrorInternal] = useState(null)
	const [statusInternal, setStatusInternal] = useState(null)

	const emptyForm = () => {
		setTitle('')
		setQuantity(1)
		setStatusInternal(STATUS_DEFAULT)
	}

	useEffect(() => {
		switch (status) {
		case STATUS_ERROR:
			setErrorInternal(error)
			break
		}

		setStatusInternal(status)
	},
	[status]
	)

	if (statusInternal === STATUS_CREATED) {
		emptyForm()
	}

	const action = (dto) => {
		submitForm(listId, dto)
	}

	const onSubmit = (e) => {
		e.preventDefault()
		action({
			title,
			quantity
		})
	}

	let errorBlock

	if (errorInternal !== null) {
		errorBlock = (
			<Callout intent={Intent.DANGER}>{errorInternal}</Callout>
		)
	}

	return (
		<AddItemForm
			fields={
				{
					title: t('shopping_quick_add_form.title'),
					quantity: t('shopping_quick_add_form.quantity')
				}
			}
			buttonText={t('shopping_quick_add_form.button')}
			className={className}
			quickAction={() => {
				history.push('/shopping/' + listId + '/new')
			}}
			action={action}
		/>
	)
}

const mapStateToProps = (state, ownProps) => {
	const shoppingForm = getShoppingForm(state)

	const t = ownProps.i18n.t.bind(ownProps.i18n)
	return {
		status: shoppingForm.status,
		error: shoppingForm.error,
		t,
		listId: ownProps.listId
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	const locale = ownProps.i18n.language
	return {
		submitForm: (listId, dto) => dispatch(shoppingFormSubmit(listId, dto, locale))
	}
}

ShoppingQuickAddForm.propTypes = {
	status: PropTypes.string,
	error: PropTypes.string,
	listId: PropTypes.number,
	submitForm: PropTypes.func,
	t: PropTypes.func
}

export default compose(withTranslation('translations'), connect(mapStateToProps, mapDispatchToProps))(ShoppingQuickAddForm)
