import { bankQuery } from '@/bank-query/bank-query.lib'

export class StatisticService {
	#BASE_URL = '/statistics'

	main(onSuccess) {
		return bankQuery({
			path: this.#BASE_URL,
			onSuccess
		})
	}
}
