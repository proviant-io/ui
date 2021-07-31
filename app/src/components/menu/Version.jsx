import * as React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { fetchCoreVersion } from '../../redux/actions/version'
import { getVersion } from '../../redux/selectors'
import { useEffect } from 'react'
import { version } from '../../utils/env'
import { withTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

const Version = ({ versions, fetchCoreVersion }) => {
	const uiVersion = version()

	useEffect(() => {
		fetchCoreVersion()
	}, [])

	let coreVersion

	if (versions.core && versions.core.version) {
		coreVersion = (
			<span className={'version__item'}>
				core: <a target={'_blank'} href={'https://github.com/proviant-io/core/releases/tag/' + versions.core.version} rel="noreferrer">{versions.core.version}</a>
			</span>
		)
	}

	return (
		<div className={'version'}>
			<span className={'version__item'}>ui: <a target={'_blank'} href={'https://github.com/proviant-io/ui/releases/tag/' + uiVersion} rel="noreferrer">{uiVersion}</a></span>
			{coreVersion}
		</div>
	)
}

const mapStateToProps = (state, ownProps) => {
	const versions = getVersion(state)
	return { versions }
}

const mapDispatchToProps = (dispatch, ownProps) => {
	const locale = ownProps.i18n.language

	return {
		fetchCoreVersion: () => dispatch(fetchCoreVersion(locale))
	}
}

Version.propTypes = {
	versions: PropTypes.object,
	fetchCoreVersion: PropTypes.func
}

export default compose(withTranslation('translations'), connect(mapStateToProps, mapDispatchToProps))(Version)
