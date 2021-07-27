import * as React from 'react'
import { actionLogin } from '../../redux/actions/user'
import { Callout, H2, InputGroup, Intent, Overlay } from '@blueprintjs/core'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { getUser } from '../../redux/selectors'
import { STATUS_DEFAULT, STATUS_EDITING, STATUS_ERROR, STATUS_SENDING, STATUS_SUCCESS } from '../../redux/reducers/consts'
import { useEffect, useState } from 'react'
import { withTranslation } from 'react-i18next'
import Button from '../generic/Button'
import PropTypes from 'prop-types'

const Login = ({ t, user, login }) => {
	const [email, setEmail] = useState('')
	const [status, setStatus] = useState(user.status)

	useEffect(() => {
		setStatus(user.status)
	}, [user.status])

	if (status === STATUS_SUCCESS) {
		return (
			<Overlay
				isOpen={status === STATUS_SUCCESS}
				onClose={() => {
				}}
			>
				<section className={'auth-form'}>
					<Callout title={t('login.check_your_email')}/>
				</section>
			</Overlay>
		)
	}

	let error

	if (status === STATUS_ERROR) {
		error = (
			<span className={'auth-form__error'}>{t(user.error)}</span>
		)
	}

	return (
		<Overlay
			isOpen={status !== STATUS_DEFAULT}
			onClose={() => {
			}}
		>
			<section className={'auth-form'}>
				<div className={'auth-form__wrapper'}>
					<h1 className={'auth-form__title'}>Login</h1>
					<form className={'auth-form__inner'} onSubmit={(e) => {
						e.preventDefault()
						login(email)
					}}>

						<input className={'auth-form__email ' + (status === STATUS_ERROR ? 'auth-form__email--error' : '')} type={'email'} required form="novalidatedform" onChange={(e) => {
							setEmail(e.target.value)
							setStatus(STATUS_EDITING)
						}}/>
						{error}

						<Button disabled={status === STATUS_SENDING || status === STATUS_ERROR} type={'submit'} className={'auth-form__button button--login'} text={'Login'}/>
						<a className={'auth-form__link'} href="#">{t('login.dont_have_account')}</a>
					</form>
				</div>
			</section>
		</Overlay>
	)
}

const mapStateToProps = (state, ownProps) => {
	const t = ownProps.i18n.t.bind(ownProps.i18n)
	const user = getUser(state)
	return { t, user }
}

const mapDispatchToProps = (dispatch, ownProps) => {
	const locale = ownProps.i18n.language
	return {
		login: (email) => dispatch(actionLogin(email, locale))
	}
}

Login.propTypes = {
	user: PropTypes.object,
	login: PropTypes.func,
	t: PropTypes.func
}

export default compose(withTranslation('translations'), connect(mapStateToProps, mapDispatchToProps))(Login)
