import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service.js'
import styles from './user-item.module.scss'
import template from './user-item.template.html'

export class UserIcon extends ChildComponent {
	render() {
		this.element = renderService.htmlToElement(template, [], styles)
		return this.element
	}
}
