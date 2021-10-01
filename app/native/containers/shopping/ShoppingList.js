import { connect } from 'react-redux'
import { getShoppingList } from '../../../common/redux/selectors'
import { shoppingListFetchItems } from '../../../common/redux/actions/shopping/list'
import { shoppingListItemCheck, shoppingListItemUncheck } from '../../../common/redux/actions/shopping/tick'
import { STATUS_FETCH_FAILED, STATUS_LOADING } from '../../../common/redux/reducers/consts'
import { Text, View, ScrollView } from 'react-native'
import AddButton from '../../components/generic/AddButton'
import PropTypes from 'prop-types'
import React from 'react'
import ShoppingListRow from '../../components/shopping/ShoppingListRow'

const ShoppingList = ({ fetchItems, status, error, items, checkItem, uncheckItem, navigation }) => {
	const shoppingListId = 1

	React.useEffect(() => {
		fetchItems(shoppingListId)
	}, [])

	if (status === STATUS_LOADING) {
		return (
			<View>
				<Text>
					Loading
				</Text>
			</View>

		)
	}

	if (status === STATUS_FETCH_FAILED) {
		return (
			<View>
				<Text>
					{error}
				</Text>
			</View>
		)
	}

	if (items.length === 0) {
		return (
			<View>
				<Text>
					no items
				</Text>
			</View>
		)
	}

	return (
		<View style={style.container}>
			<ScrollView style={style.list}>
				{items.map(item => (
					<ShoppingListRow
						navigation={navigation}
						key={item.id}
						item={item}
						onCheck={() => {
							checkItem(shoppingListId, item.id)
						}}
						onUncheck={() => {
							uncheckItem(shoppingListId, item.id)
						}}
					/>
				))}

			</ScrollView>
			<AddButton navigation={navigation}/>
		</View>

	)
}

const style = {
	container: {
		minHeight: '100%',
		flex: 1
	},
	list: {
		paddingBottom: 100
	}
}

const mapStateToProps = (state, ownProps) => {
	const shoppingList = getShoppingList(state)

	return {
		model: shoppingList.model,
		items: shoppingList.model.items,
		status: shoppingList.status,
		error: shoppingList.error
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	const locale = 'en'
	return {
		fetchItems: (query) => dispatch(shoppingListFetchItems(query, locale)),
		checkItem: (listId, id) => dispatch(shoppingListItemCheck(listId, id, locale)),
		uncheckItem: (listId, id) => dispatch(shoppingListItemUncheck(listId, id, locale))
	}
}

ShoppingList.propTypes = {
	model: PropTypes.object,
	fetchItems: PropTypes.func,
	checkItem: PropTypes.func,
	uncheckItem: PropTypes.func,
	t: PropTypes.func,
	status: PropTypes.string,
	error: PropTypes.string,
	items: PropTypes.array,
	navigation: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingList)
