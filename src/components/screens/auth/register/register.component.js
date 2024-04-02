import { Button } from '@/components/ui/button/button.component'
import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service.js'
import styles from './register.module.scss'
import template from './register.template.html'

export class Register extends ChildComponent {
	render() {
		this.element = renderService.htmlToElement(
			template,
			[
				new Button({
					children: 'Register'
				})
			],
			styles
		)
		return this.element
	}
}
