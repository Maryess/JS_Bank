import { CardService } from '@/api/card.service'
import { Button } from '@/components/ui/button/button.component'
import { Field } from '@/components/ui/field/field.component'
import { BALANCE_UPDATE_EVENT } from '@/constants/event.constants'
import ChildComponent from '@/core/component/child.component'
import { $R } from '@/core/rquery/rquery.lib'
import { NotificationService } from '@/core/services/notification.service'
import renderService from '@/core/services/render.service.js'
import validateService from '@/core/services/validate.service'
import { Store } from '@/core/store/store'
import styles from './replenish.module.scss'
import template from './replenish.template.html'

export class Replenish extends ChildComponent {
	constructor() {
		super()

		this.store = Store.getInstance().state
		this.cardService = new CardService()
		this.notification = new NotificationService()
	}

	updateBalance(event, type) {
		event.preventDefault()

		if (!this.store.user) {
			this.notification.show('error', 'You need authorization')
		}

		$R(event.target).text('Sending...').attr('disabled', true)

		const inputValue = $R(this.element).find('input')
		const amount = inputValue.value()

		if (!amount) {
			validateService.showError(
				$R(this.element).find('label'),
				'Please fill in the field '
			)
			return
		}

		this.cardService.updateBalance(amount, type, () => {
			inputValue.value('')

			const balanceUpdate = new Event(BALANCE_UPDATE_EVENT)
			document.dispatchEvent(balanceUpdate)
		})

		$R(event.target).removeAttr('disabled').text(type)
	}

	render() {
		this.element = renderService.htmlToElement(
			template,
			[
				new Field({
					placeholder: 'Enter amount',
					name: 'amount',
					type: 'number'
				})
			],
			styles
		)

		$R(this.element)
			.find('#actions-buttons')
			.append(
				new Button({
					variant: 'green',
					children: 'Top-Up',
					onClick: e => this.updateBalance(e, 'top-up')
				}).render()
			)
			.append(
				new Button({
					variant: 'purple',
					children: 'Withdrawal',
					onClick: e => this.updateBalance(e, 'withdrawal')
				}).render()
			)

		return this.element
	}
}
