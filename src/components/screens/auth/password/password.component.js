import { Field } from '@/components/ui/field/field.component'
import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service.js'
import styles from './password.module.scss'
import template from './password.template.html'

export class Password extends ChildComponent {
	render() {
		this.element = renderService.htmlToElement(
			template,
			[
				new Field({
					placeholder: 'Enter password',
					type: 'password',
					name: 'password'
				})
			],
			styles
		)
		return this.element
	}
}
