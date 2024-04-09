import { BaseScreen } from '@/core/component/base-screen.component.js'
import renderService from '@/core/services/render.service.js'
import { CardInfo } from './card-info/card-info.component'
import styles from './home.module.scss'
import template from './home.template.html'
import { Transaction } from './transaction/transaction.component'

export class Home extends BaseScreen {
	constructor() {
		super({ title: 'Home' })
	}
	render() {
		const element = renderService.htmlToElement(
			template,
			[new CardInfo(), new Transaction()],

			styles
		)

		return element
	}
}
