import ChildComponent from '@/core/component/child.component'
import { $R } from '@/core/rquery/rquery.lib'
import renderService from '@/core/services/render.service'
import { Header } from './header/header.component'
import styles from './layout.module.scss'
import template from './layout.template.html'

export class Layout extends ChildComponent {
	constructor({ router, children }) {
		super()
		this.children = children
		this.router = router
	}

	render() {
		this.element = renderService.htmlToElement(template, [], styles)

		const mainElement = $R(this.element).find('main')

		const contentContainer = $R(this.element).find('#content')
		contentContainer.append(this.children)

		mainElement
			.before(
				new Header({
					router: this.router
				}).render()
			)
			.append(contentContainer.element)

		return this.element
	}
}
