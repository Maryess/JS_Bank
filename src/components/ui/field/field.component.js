import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service.js'
import styles from './field.module.scss'
import template from './field.template.html'

export class Field extends ChildComponent {
	constructor({ placeholder, type = '', value = '', name, variant }) {
		super()

		if (!name) throw new Error('Please fill field "name"!')

		this.placeholder = placeholder
		this.type = type
		this.value = value
		this.name = name
		this.variant = variant
	}
	render() {
		this.element = renderService.htmlToElement(template, [], styles)

		if (this.variant) $R(this.element).addClass(styles[this.variant])
		return this.element
	}
}
