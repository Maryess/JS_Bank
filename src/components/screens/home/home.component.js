import { Field } from '@/components/ui/field/field.component'
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
		const element = renderService.htmlToElement(
			template,
			[
				// new Button({
				// 	children: 'Send',
				// 	variant: 'purple',
				// 	onClick: () => alert('Hey')
				// }),
				new Field({})
			],
			styles
		)
		$R(element).find('p').css('color', 'green')

		return element
	}
}
