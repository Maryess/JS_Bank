import { Heading } from '@/components/ui/heading/heading.component'
import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service.js'
import styles from './transaction.module.scss'
import template from './transaction.template.html'

export class Transaction extends ChildComponent {
	render() {
		this.element = renderService.htmlToElement(
			template,
			[new Heading('Recent transaction')],
			styles
		)
		return this.element
	}
}
