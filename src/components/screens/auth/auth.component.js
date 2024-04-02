import { BaseScreen } from '@/core/component/base-screen.component.js'
import renderService from '@/core/services/render.service.js'
import styles from './auth.module.scss'
import template from './auth.template.html'
import { Email } from './email/email.component'
import { Password } from './password/password.component'
import { Register } from './register/register.component'
import { Submit } from './submit/submit.component'

export class Auth extends BaseScreen {
	constructor() {
		super({ title: 'Auth' })
	}

	render() {
		this.element = renderService.htmlToElement(
			template,
			[Email, Password, Submit, Register],
			styles
		)

		return this.element
	}
}
