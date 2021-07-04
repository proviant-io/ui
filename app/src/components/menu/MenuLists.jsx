import * as React from 'react'
import { Callout, Classes, Intent, Menu, MenuDivider, MenuItem, Spinner } from '@blueprintjs/core'
import { connect } from 'react-redux'
import { CreateForm } from './CreateForm'
import { createList, fetchLists } from '../../redux/actions/lists'
import { getLists } from '../../redux/selectors'
import { STATUS_ERROR, STATUS_LOADING } from '../../redux/reducers/consts'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Item from './Item'
import PropTypes from 'prop-types'

const MenuLists = ({ lists, fetchLists, createList }) => {
	const history = useHistory()

	useEffect(() => {
		fetchLists()
	}, [])

	const goToAllProduct = () => {
		history.push('/')
	}

	const goToList = (id) => {
		history.push(`/list/${id}`)
	}

	if (lists.status === STATUS_LOADING) {
		return <Menu
			className={`${
				Classes.ELEVATION_0
			} page-header__navigation-list page-header__navigation-list--side-bar`}
		>
			<MenuDivider title="Lists"/>
			<Spinner/>
		</Menu>
	}

	if (lists.status === STATUS_ERROR) {
		return <Menu
			className={`${
				Classes.ELEVATION_0
			} page-header__navigation-list page-header__navigation-list--side-bar`}
		>
			<MenuDivider title="Lists"/>
			<Callout title={'oops... something went wrong'} intent={Intent.DANGER}>
				{lists.error}
			</Callout>
		</Menu>
	}

	const createForm = <CreateForm
		placeholder="New List"
		icon={'list'}
		onSubmit={title => createList(title)}
		status={lists.createForm.status}
		error={lists.createForm.error}
	/>

	if (lists.items.length === 0) {
		return <Menu
			className={`${
				Classes.ELEVATION_0
			} page-header__navigation-list page-header__navigation-list--side-bar`}
		>
			<MenuDivider title="Lists"/>
			{createForm}
			<Item
				key={'all'}
				icon="dot"
				text={'All Products'}
				onClick={() => goToAllProduct()}
			/>
		</Menu>
	}

	return <Menu
		className={`${
			Classes.ELEVATION_0
		} page-header__navigation-list page-header__navigation-list--side-bar`}
	>
		<MenuDivider title="Lists"/>
		{createForm}
		<MenuItem icon="dot" text="All products" onClick={goToAllProduct}/>
		{lists.items.map(item => (
			<Item
				key={item.id}
				icon="dot"
				text={item.title}
				onClick={() => goToList(item.id)}
				button={{
					icon: 'edit',
					action: () => {
						history.push('/list/' + item.id + '/edit')
					}
				}}
			/>
		))}
	</Menu>
}

const mapStateToProps = state => {
	const lists = getLists(state)
	return { lists }
}

const mapDispatchToProps = dispatch => {
	return {
		fetchLists: () => dispatch(fetchLists()),
		createList: (title) => dispatch(createList(title))
	}
}

MenuLists.propTypes = {
	fetchLists: PropTypes.func,
	createList: PropTypes.func,
	lists: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuLists)