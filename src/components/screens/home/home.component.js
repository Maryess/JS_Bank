import { BaseScreen } from '@/core/component/base-screen.component.js'
import { $R } from '@/core/rquery/rquery.lib'
import renderService from '@/core/services/render.service.js'
import styles from './home.module.scss'
import template from './home.template.html'
export class Home extends BaseScreen {
	constructor() {
		super({ title: 'Home' })
	}
	render() {
		const element = renderService.htmlToElement(template, [], styles)
		$R(element).find('p').css('color', 'red')

		return element
	}
}
