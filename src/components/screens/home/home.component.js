import { Field } from '@/components/ui/field/field.component'
import { Heading } from '@/components/ui/heading/heading.component'
import { UserItem } from '@/components/ui/user-item/user-item.component'
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
				new UserItem({
					name: 'Mary',
					avatarPath:
						'https://w.forfun.com/fetch/b7/b77ae3f6f1afd7a4ed41fa4be58015a6.jpeg'
				}),
				new Field({
					placeholder: 'Enter mail',
					name: 'text'
				}),
				new Heading('Привет')
			],

			styles
		)
		$R(element).find('p').css('color', 'green')

		return element
	}
}
