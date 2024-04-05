import { bankQuery } from '@/bank-query/bank-query.lib'

export class UserService {
	#BASE_URL = '/users'

	getAll(searchTerm, onSuccess) {
		return bankQuery({
			path: `${this.#BASE_URL}${
				searchTerm
					? `?${new URLSearchParams({
							searchTerm
						})}`
					: ''
			}`,
			onSuccess
		})
	}
}
