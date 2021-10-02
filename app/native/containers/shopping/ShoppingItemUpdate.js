import { Button, Input } from 'react-native-elements'
import { connect } from 'react-redux'
import { getShoppingList, getShoppingListEdit, getShoppingListItem } from '../../../common/redux/selectors'
import { shoppingItemDelete } from '../../../common/redux/actions/shopping/delete'
import { shoppingItemUpdate, shoppingListItemReset } from '../../../common/redux/actions/shopping/edit'
import { shoppingListItemCheck, shoppingListItemUncheck } from '../../../common/redux/actions/shopping/tick'
import { STATUS_DEFAULT, STATUS_SENDING, STATUS_UPDATED } from '../../../common/redux/reducers/consts'
import { StyleSheet, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import ShoppingListTick from '../../components/shopping/ShoppingListTick'

const ShoppingItemUpdate = ({ item, reset, status, checkItem, uncheckItem, updateItem }) => {
	const shoppingListId = 3

	const onCheck = () => {
		checkItem(shoppingListId, item.id)
	}
	const onUncheck = () => {
		uncheckItem(shoppingListId, item.id)
	}

	const [title, setTitle] = useState('')
	const [quantity, setQuantity] = useState('')
	const [statusInternal, setStatusInternal] = useState('')

	const emptyForm = () => {
		setTitle('')
		setQuantity(1)
		setStatusInternal(STATUS_DEFAULT)
	}

	useEffect(() => {
		reset()
		emptyForm()
		setTitle(item.title)
		setQuantity(item.quantity)
	}, [])

	const onSubmit = () => {
		updateItem(shoppingListId, item.id, {
			title,
			quantity
		})
	}

	let buttonSave = []

	console.log(status)

	if (status === STATUS_DEFAULT) {
		buttonSave = (
			<Button
				title="Save"
				icon={
					<Icon name="save" size={15} color="white"/>
				}
				iconPosition={'left'}
				onPress={onSubmit}
			/>
		)
	}

	if (status === STATUS_SENDING) {
		buttonSave = (
			<Button
				loading={true}
				disabled={true}
			/>
		)
	}

	if (status === STATUS_UPDATED) {
		buttonSave = (
			<Button
				title="Updated"
				buttonStyle={styles.button_success}
				icon={
					<Icon name="check" size={15} color="white"/>
				}
				iconPosition={'left'}
				onPress={onSubmit}
			/>
		)
	}

	return (
		<View>
			<Input
				placeholder={'Product title'}
				style={styles.title}
				onChangeText={setTitle}
				value={title}
			/>

			<ShoppingListTick
				extraStyles={styles.tick}
				isChecked={item.checked}
				onCheck={onCheck}
				onUncheck={onUncheck}
			/>

			<Input
				placeholder="Quantity"
				leftIcon={{ type: 'font-awesome', name: 'shopping-basket' }}
				value={String(quantity)}
				keyboardType={'numeric'}
				onChangeText={value => {
					if (value === '' || isNaN(Number(value))) {
						setQuantity('')
					} else {
						setQuantity(Number(value))
					}
				}}

			/>
			{buttonSave}

		</View>
	)
}

const styles = StyleSheet.create({
	title: {
		height: 50,
		fontSize: 20,
		marginRight: 60,
		marginTop: 15
	},
	tick: {
		marginTop: 10,
		marginRight: 10
	},
	button_success: {
		backgroundColor: 'green'

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

ShoppingItemUpdate.propTypes = {
	item: PropTypes.object,
	itemId: PropTypes.number,
	updateItem: PropTypes.func,
	deleteItem: PropTypes.func,
	reset: PropTypes.func,
	closePopover: PropTypes.func,
	className: PropTypes.string,
	i18n: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingItemUpdate)
