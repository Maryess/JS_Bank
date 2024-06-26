import { getTitle } from '@/config/seo.config'

export class BaseScreen {
	/**
	 * Create a new BaseScreen instance
	 * @param {Object} options - The options for the BaseScreens
	 * @param {title} options.title - The title for the screen
	 */
	constructor({ title }) {
		document.title = getTitle(title)
	}

	/**
	 * Render the child component content
	 * @param {HTMLElement}
	 */

	render() {
		throw new Error('Render method must be implemented in the child class')
	}
}
