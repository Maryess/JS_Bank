class RQuery {
	/**
	 *
	 * @param {string|HTMLElement} selector
	 */

	constructor(selector) {
		if (typeof selector === 'string') {
			this.element = document.querySelector(selector)
			if (!this.element) {
				throw new Error(`Element ${selector} not found`)
			}
		} else if (selector instanceof HTMLElement) {
			this.element = selector
		} else {
			throw new Error('Invalid selector type ')
		}
	}

	/**
	 *
	 * @param {string} selector
	 * @returns {RQuery}
	 */

	find(selector) {
		const element = new RQuery(this.element.querySelector(selector))
		if (element) {
			return element
		} else {
			throw new Error(`Element ${selector} not found`)
		}
	}

	/**
	 * @param {string} property
	 * @param {string} value
	 * @returns {RQuery}
	 *
	 */

	css(property, value) {
		if (typeof property !== 'string' && value !== 'string') {
			throw new Error('property and value must be string')
		}

		this.element.style[property] = value
		return this
	}
}
export function $R(selector) {
	return new RQuery(selector)
}
