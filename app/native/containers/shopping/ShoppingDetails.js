import { Button, StyleSheet, TextInput, View } from 'react-native'
import { connect } from 'react-redux'
import { getShoppingList, getShoppingListEdit, getShoppingListItem } from '../../../common/redux/selectors'
import { shoppingItemDelete } from '../../../common/redux/actions/shopping/delete'
import { shoppingItemUpdate, shoppingListItemReset } from '../../../common/redux/actions/shopping/edit'
import { shoppingListItemCheck, shoppingListItemUncheck } from '../../../common/redux/actions/shopping/tick'
import { STATUS_DEFAULT, STATUS_DELETED, STATUS_LOADED, STATUS_UPDATED } from '../../../common/redux/reducers/consts'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import ShoppingListTick from '../../components/shopping/ShoppingListTick'

const ShoppingDetails = ({ item, fetchStatus, reset, status, checkItem, uncheckItem, updateItem }) => {
	const shoppingListId = 1

	const onCheck = () => {
		checkItem(shoppingListId, item.id)
	}
	const onUncheck = () => {
		uncheckItem(shoppingListId, item.id)
	}

	const [title, setTitle] = useState('')
	const [quantity, setQuantity] = useState(0)
	const [statusInternal, setStatusInternal] = useState('')

	const emptyForm = () => {
		setTitle('')
		setQuantity(1)
		setStatusInternal(STATUS_DEFAULT)
	}

	useEffect(() => {
		if (fetchStatus === STATUS_LOADED || fetchStatus === STATUS_DEFAULT) {
			setTitle(item.title)
			setQuantity(item.quantity)
		}

		setStatusInternal(status)

		if (status === STATUS_UPDATED || status === STATUS_DELETED) {
			emptyForm()
			reset()
		}
	}, [
		fetchStatus, status
	])

	const onSubmit = () => {
		updateItem(shoppingListId, item.id, {
			title,
			quantity
		})
	}

	return (
		<View>
			<TextInput
				style={styles.title}
				onChangeText={setTitle}
				value={title}
				placeholder={'Product title'}
			/>
			<ShoppingListTick extraStyles={styles.tick} isChecked={item.checked} onCheck={onCheck} onUncheck={onUncheck}/>
			<TextInput
				style={styles.input}
				onChangeText={setQuantity}
				value={String(quantity)}
				keyboardType="numeric"
				placeholder={'quantity'}
			/>
			<Button title={'save'} onPress={onSubmit}/>
		</View>
	)
}

const styles = StyleSheet.create({
	title: {
		height: 50,
		margin: 12,
		fontSize: 20,
		padding: 10,
		marginRight: 60
	},
	input: {
		height: 50,
		margin: 12,
		fontSize: 20,
		borderWidth: 1,
		padding: 10
	},
	tick: {
		marginTop: 10,
		marginRight: 10
	}
})

const mapStateToProps = (state, ownProps) => {
	const shoppingList = getShoppingList(state)
	const shoppingListEdit = getShoppingListEdit(state)
	const shoppingListItem = getShoppingListItem(state, ownProps.route.params.itemId)

	return {
		model: shoppingList.model,
		item: shoppingListItem,
		fetchStatus: shoppingList.status,
		fetchError: shoppingList.error,
		status: shoppingListEdit.status,
		error: shoppingListEdit.error,
		id: ownProps.itemId,
		listId: ownProps.listId
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	const locale = 'en'
	return {
		checkItem: (listId, id) => dispatch(shoppingListItemCheck(listId, id, locale)),
		uncheckItem: (listId, id) => dispatch(shoppingListItemUncheck(listId, id, locale)),
		updateItem: (listId, id, dto) => dispatch(shoppingItemUpdate(listId, id, dto, locale)),
		deleteItem: (listId, id) => dispatch(shoppingItemDelete(listId, id, locale)),
		reset: () => dispatch(shoppingListItemReset())
	}
}

ShoppingDetails.propTypes = {
	item: PropTypes.object,
	itemId: PropTypes.number,
	updateItem: PropTypes.func,
	deleteItem: PropTypes.func,
	reset: PropTypes.func,
	closePopover: PropTypes.func,
	className: PropTypes.string,
	i18n: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingDetails)
