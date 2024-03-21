import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.servise.js'
import styles from './about-us.module.scss'
import template from './about-us.template.html'


export class AboutUs extends ChildComponent {
	render() {
		this.element = renderService.htmlToElement(template, [], styles)
		return this.element
	}
}