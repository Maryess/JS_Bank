import { AuthService } from '@/api/auth.service'
import { Button } from '@/components/ui/button/button.component'
import { Field } from '@/components/ui/field/field.component'
import { BaseScreen } from '@/core/component/base-screen.component.js'
import { $R } from '@/core/rquery/rquery.lib'
import formService from '@/core/services/form.service'
import renderService from '@/core/services/render.service.js'
import validateService from '@/core/services/validate.service'
import styles from './auth.module.scss'
import template from './auth.template.html'

export class Auth extends BaseScreen {
	#isTypeLogin = true

	constructor() {
		super({ title: 'Auth' })
		this.authService = new AuthService()
	}

	#checkValidate(formValue) {
		const emailLabel = $R(this.element).find('label:first-child')
		const passwordLabel = $R(this.element).find('label:last-child')
		const inputs = emailLabel && passwordLabel
		if (!formValue.email) {
			validateService.showError(emailLabel, 'Поле не должно быть пустым')
		}
		if (!formValue.password) {
			validateService.showError(passwordLabel, 'Поле не должно быть пустым')
		}
		if (!formValue.email && !formValue.password) {
			validateService.showError(inputs, 'Поля не должны быть пустыми')
		}

		return formValue.email
	}

	#handleSubmit = event => {
		event.preventDefault()

		const formValue = formService.getFormValues(event.target)
		if (!this.#checkValidate(formValue)) return
		const type = this.#isTypeLogin ? 'login' : 'register'
		this.authService.main(type, formValue)
	}

	#changeForm = event => {
		event.preventDefault()

		$R(this.element)
			.find('h1')
			.text(this.#isTypeLogin ? 'Register' : 'Sign in ')

		$R(event.target).text(this.#isTypeLogin ? 'Sign in' : 'Register ')

		this.#isTypeLogin = !this.#isTypeLogin
	}

	render() {
		this.element = renderService.htmlToElement(
			template,
			[
				new Button({
					children: 'Submit'
				})
			],
			styles
		)

		$R(this.element)
			.find('#auth-inputs')
			.append(
				new Field({
					placeholder: 'Enter email',
					name: 'email',
					type: 'email'
				}).render()
			)
			.append(
				new Field({
					placeholder: 'Enter password',
					name: 'password',
					type: 'password'
				}).render()
			)

		$R(this.element).find('#change-form-type').click(this.#changeForm)
		$R(this.element).find('form').submit(this.#handleSubmit)

		return this.element
	}
}
