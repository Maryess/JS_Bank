import { BaseScreen } from '@/core/component/base-screen.component.js'

export class NotFound extends BaseScreen {
	constructor() {
		super({ title: 'Not Found' })
	}

	render() {
		return 'Not found'
	}
}
