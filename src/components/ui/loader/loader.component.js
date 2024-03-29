import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import styles from './heading.module.scss'
import template from './heading.template.html'

export const LOADER_SELECTOR = '[	data-component="loader"]'

export class Loader extends ChildComponent {
	constructor(width = 100, height = 100) {
		super()

		this.width = width
		this.height = height
	}
	render() {
		$R(this.element)
			.css('width', `${this.width}px`)
			.css('height', `${this.height}px`)
			.addClass('bounce')
		this.element = renderService.htmlToElement(template, [], styles)

		return this.element
	}
}
