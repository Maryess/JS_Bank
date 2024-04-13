import ChildComponent from '@/core/component/child.component'
import { $R } from '@/core/rquery/rquery.lib'
import renderService from '@/core/services/render.service'
import { Store } from '@/core/store/store'

import { Heading } from '@/components/ui/heading/heading.component'
import {
	LOADER_SELECTOR,
	Loader
} from '@/components/ui/loader/loader.component'

import { TransactionService } from '@/api/transaction.service'

import styles from './transaction.module.scss'
import template from './transaction.template.html'

import { TRANSACTION_EVENT } from '@/constants/event.constants'
import { TransactionItem } from './transaction-item/transaction-item.component'

export class Transaction extends ChildComponent {
	constructor() {
		super()
		this.store = Store.getInstance().state
		this.transactionService = new TransactionService()

		this.element = renderService.htmlToElement(
			template,
			[new Heading('Recent transactions')],
			styles
		)
		this.#addListeners()
	}

	#addListeners() {
		document.addEventListener(TRANSACTION_EVENT, this.#onTransactionCompleted)
	}

	#removeListeners() {
		document.removeEventListener(
			TRANSACTION_EVENT,

			this.#onTransactionCompleted
		)
	}

	#onTransactionCompleted = () => {
		this.fetchData()
	}

	destroy() {
		this.#removeListeners()
	}

	fetchData() {
		this.transactionService.getAll(data => {
			if (!data) return

			const loaderElement = this.element.querySelector(LOADER_SELECTOR)
			if (loaderElement) loaderElement.remove()

			const transactionsList = $R(this.element).find('#transaction-list')
			transactionsList.text('')

			if (data.length) {
				for (const transaction of data.transactions) {
					transactionsList.append(new TransactionItem(transaction).render())
				}
			} else {
				transactionsList.text('Transactions not found!')
			}
		})
	}

	render() {
		if (this.store.user) {
			$R(this.element).append(new Loader().render())
			this.fetchData()
		}

		return this.element
	}
}
