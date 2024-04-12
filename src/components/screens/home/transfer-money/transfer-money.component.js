import { UserService } from '@/api/user.service'
import { Heading } from '@/components/ui/heading/heading.component'
import {
	Loader,
	LOADER_SELECTOR
} from '@/components/ui/loader/loader.component'
import { UserItem } from '@/components/ui/user-item/user-item.component'
import ChildComponent from '@/core/component/child.component'
import { $R } from '@/core/rquery/rquery.lib'
import renderService from '@/core/services/render.service.js'
import { Store } from '@/core/store/store'
import { formatCardNumberWithDashes } from '@/utils/format/format-card-number'
import { CardInfo } from '../card-info/card-info.component'
import { Send, SEND_MONEY } from './send/send.component'
import styles from './transfer-money.module.scss'
import template from './transfer-money.template.html'

export class TransferMoney extends ChildComponent {
	constructor() {
		super()

		this.store = Store.getInstance().state
		this.userService = new UserService()
		this.cardInfo = new CardInfo()
	}

	fetchData() {
		this.userService.getAll(null, data => {
			if (!data) return

			this.element.querySelector(LOADER_SELECTOR).remove()

			for (const user of data) {
				$R(this.element)
					.find('#contacts')
					.append(
						new UserItem(user, true, () => {
							$R(SEND_MONEY).value(formatCardNumberWithDashes(user.card.number))
						}).render()
					)
			}

			$R(this.element)
				.find('#contacts')
				.findAll('button')
				.forEach(contactElement => {
					contactElement.addClass('fade-in')
				})
		})
	}

	render() {
		this.element = renderService.htmlToElement(
			template,
			[new Heading('Transfer money'), Send],
			styles
		)

		if (this.store.user) {
			$R(this.element).find('#contacts').html(new Loader().render().outerHTML)

			this.fetchData()
		}

		return this.element
	}
}
