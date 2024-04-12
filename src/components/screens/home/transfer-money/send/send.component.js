import { CardService } from '@/api/card.service'
import { Button } from '@/components/ui/button/button.component'
import { Field } from '@/components/ui/field/field.component'
import {
	BALANCE_UPDATE_EVENT,
	TRANSACTION_EVENT
} from '@/constants/event.constants'
import ChildComponent from '@/core/component/child.component'
import { $R } from '@/core/rquery/rquery.lib'
import { NotificationService } from '@/core/services/notification.service'
import renderService from '@/core/services/render.service.js'
import validateService from '@/core/services/validate.service'
import { Store } from '@/core/store/store'
import styles from './send.module.scss'
import template from './send.template.html'
export const SEND_MONEY = '[name="card-number"]'
export class Send extends ChildComponent {
	constructor() {
		super()

		this.store = Store.getInstance().state
		this.cardService = new CardService()
		this.notification = new NotificationService()
	}

	handleSend(event) {
		event.preventDefault()

		if (!this.store.user) {
			this.notification.show('error', 'You need authorization')
		}

		$R(event.target).text('Sending...').attr('disabled', true)

		let inputValue = $R(this.element).find('input')
		const toCardNumber = inputValue.value().replaceAll('-', '')

		const reset = () => {
			$R(event.target).removeAttr('disabled').text('Send')
		}

		if (!toCardNumber) {
			validateService.showError($R(this.element).find('label'))
			reset()
			return
		}

		let amount = prompt('Transfer amount 👇')

		this.cardService.transfer({ amount, toCardNumber }, () => {
			inputValue = ''
			amount = ''

			document.dispatchEvent(new Event(TRANSACTION_EVENT))
			document.dispatchEvent(BALANCE_UPDATE_EVENT)
		})

		reset()
	}

	render() {
		this.element = renderService.htmlToElement(
			template,
			[
				new Field({
					placeholder: 'xxxx-xxxx-xxxx-xxxx',
					variant: 'credit-card',
					name: 'code'
				}),
				new Button({
					children: 'Send',
					variant: 'purple',
					onClick: this.handleSend.bind(this)
				})
			],
			styles
		)
		return this.element
	}
}
