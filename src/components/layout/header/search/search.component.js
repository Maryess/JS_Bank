import { UserService } from '@/api/user.service'
import { CardInfo } from '@/components/screens/home/card-info/card-info.component'
import { TRANSFER_FIELD_SELECTOR } from '@/components/screens/home/transfer-money/send/send.component'
import { UserItem } from '@/components/ui/user-item/user-item.component'
import ChildComponent from '@/core/component/child.component'
import { $R } from '@/core/rquery/rquery.lib'
import renderService from '@/core/services/render.service.js'
import { debounce } from '@/utils/debounce.utils'
import { formatCardNumberWithDashes } from '@/utils/format/format-card-number'
import styles from './search.module.scss'
import template from './search.template.html'

export class Search extends ChildComponent {
	constructor() {
		super()

		this.userService = new UserService()
		this.cardInfo = new CardInfo()
	}

	async #handleSearch(event) {
		const searchTerm = event.target.value
		const searchResultElement = $R(this.element).find('#search-results')

		if (!searchTerm) {
			searchResultElement.html('')
			return
		}

		await this.userService.getAll(searchTerm, users => {
			searchResultElement.html('')

			users.forEach((user, index) => {
				const userItem = new UserItem(user, false, () => {
					$R(TRANSFER_FIELD_SELECTOR).value(
						formatCardNumberWithDashes(user.card.number)
					)
					searchResultElement.html('')
					$R().find('#content').append(this.cardInfo.render())
				}).render()
				$R(userItem)
					.addClass(styles.item)
					.css('transition-delay', `${index * 0.1}s`)

				searchResultElement.append(userItem)
				setTimeout(() => {
					$R(userItem).addClass(styles.visible)
				}, 50)
			})
		})
	}

	render() {
		this.element = renderService.htmlToElement(template, [], styles)
		const func = debounce(this.#handleSearch.bind(this), 300)
		$R(this.element)
			.find('input')
			.input({
				type: 'search',
				name: 'search',
				placeholder: 'Search contacts...'
			})
			.on('input', func)
		return this.element
	}
}
