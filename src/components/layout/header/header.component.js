import { UserItem } from '@/components/ui/user-item/user-item.component'
import ChildComponent from '@/core/component/child.component'
import { $R } from '@/core/rquery/rquery.lib'
import renderService from '@/core/services/render.service.js'
import { Store } from '@/core/store/store'
import styles from './header.module.scss'
import template from './header.template.html'
import { Logo } from './logo/logo.component'
import { LogoutButton } from './logout-button/logout-button.component'
import { Search } from './search/search.component'

export class Header extends ChildComponent {
	constructor({ router }) {
		super()
		this.store = Store.getInstance()
		this.store.addObserver(this)
		this.router = router
		this.userItem = new UserItem({
			avatarPath: '/',
			name: 'Mary'
		})
	}

	update() {
		this.user = this.store.state.user
		const authSide = $R(this.element).find('#auth-side')
		if (!this.user) {
			authSide.hide()
		} else {
			this.userItem.update(this.user)
			authSide.show()
			this.router.navigate('/')
		}
	}

	render() {
		this.element = renderService.htmlToElement(
			template,
			[
				Logo,
				new LogoutButton({
					router: this.router
				}),
				Search,
				this.userItem
			],
			styles
		)
		this.update()

		return this.element
	}
}
