import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service.js'
import styles from './auth.module.scss'
import template from './auth.template.html'

export class Auth extends ChildComponent {
	render() {
		this.element = renderService.htmlToElement(template, [], styles)
		return this.element
	}
}
