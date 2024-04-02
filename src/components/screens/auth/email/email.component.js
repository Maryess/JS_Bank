import { Field } from '@/components/ui/field/field.component'
import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service.js'
import styles from './email.module.scss'
import template from './email.template.html'

export class Email extends ChildComponent {
	render() {
		this.element = renderService.htmlToElement(
			template,
			[
				new Field({
					placeholder: 'Enter email',
					type: 'email',
					name: 'email'
				})
			],
			styles
		)
		return this.element
	}
}
