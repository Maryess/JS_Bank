import { Button } from '@/components/ui/button/button.component'
import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service.js'
import styles from './submit.module.scss'
import template from './submit.template.html'

export class Submit extends ChildComponent {
	render() {
		this.element = renderService.htmlToElement(
			template,
			[
				new Button({
					children: 'Submit',
					variant: ''
				})
			],
			styles
		)
		return this.element
	}
}
