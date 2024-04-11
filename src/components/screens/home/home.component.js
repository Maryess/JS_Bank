import { BaseScreen } from '@/core/component/base-screen.component.js'
import renderService from '@/core/services/render.service.js'
import { CardInfo } from './card-info/card-info.component'
import styles from './home.module.scss'
import template from './home.template.html'
import { Replenish } from './replenish/replenish.component'

export class Home extends BaseScreen {
	constructor() {
		super({ title: 'Home' })
	}

	render() {
		this.element = renderService.htmlToElement(
			template,
			[CardInfo, Replenish],

			styles
		)

		return this.element
	}
}
