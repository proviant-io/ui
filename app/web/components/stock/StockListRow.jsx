import * as React from 'react'
import { Alert, Button, Intent } from '@blueprintjs/core'
import { unixToDate } from '../../utils/date'
import { useState } from 'react'
import { withTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

const StockListRow = ({ item, onDelete, i18n }) => {
	const [deleteAlert, setDeleteAlert] = useState(false)

	const expires = unixToDate(new Date(item.expire * 1000))

	return (
		<div className='product-stock__row'>
			<Alert
				cancelButtonText={i18n.t('stock.button_cancel')}
				confirmButtonText={i18n.t('stock.button_delete')}
				icon="delete"
				intent={Intent.DANGER}
				isOpen={deleteAlert}
				onCancel={() => {
					setDeleteAlert(false)
				}}
				onClose={() => {
					setDeleteAlert(false)
				}}
				canOutsideClickCancel={true}
				onConfirm={() => {
					onDelete()
				}}
				canEscapeKeyCancel={true}
			>
				<p>
					{i18n.t('stock.delete_confirmation')} <br/>
					<b>{i18n.t('stock.quantity')}: {item.quantity} {i18n.t('stock.expires')}: {expires}</b>
				</p>
			</Alert>
			<span className='product-stock__row-quantity'>{i18n.t('stock.quantity')}: <b className='product-stock__row-value'>{item.quantity}</b></span>
			<span className='product-stock__row-expires'>{i18n.t('stock.expires')}: <b className='product-stock__row-value'>{expires}</b></span>
			<Button onClick={() => {
				setDeleteAlert(true)
			}} icon={'delete'} minimal={true} intent={Intent.DANGER} text={i18n.t('stock.button_delete')}/>
		</div>
	)
}

StockListRow.propTypes = {
	item: PropTypes.object,
	onDelete: PropTypes.func,
	i18n: PropTypes.object
}

export default withTranslation('translations')(StockListRow)