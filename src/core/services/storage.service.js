export class StorageService {
	/**
	 * @param {string} key
	 * @param {any} value
	 */

	setItem(key, value) {
		localStorage.setItem(key, JSON.stringify(value))
	}

	removeItem(key) {
		localStorage.removeItem(key)
	}

	clear() {
		localStorage.clear()
	}

	/**
	 * @param {string} key
	 * @param {any} value
	 */

	getItem(key) {
		const value = localStorage.getItem(key)
		return value ? JSON.parse(value) : null
	}
}
