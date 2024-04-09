import { COLORS } from '@/config/colors.config'
import { NotificationService } from './notification.service'
class ValidateService {
	constructor() {}

	/**
	 *
	 * @param {HTMLElement} element
	 */

	showError(element, message) {
		const disappear = element.css('border-color', COLORS.error)

		setTimeout(() => {
			disappear.css('border-color', 'transparent')
		}, 2800)

		new NotificationService().show('error', message)

		// if ($R(this.element).find('#auth-inputs').validity.rangeOverflow) {
		// 	$R(this.element).find('form').text(message)
		// }
	}
}

export default new ValidateService()
