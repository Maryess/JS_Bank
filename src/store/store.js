import { ACCESS_TOKEN_KEY, USER_STORAGE_KEY } from '@/constanst/auth.const'
import { StorageService } from '@/core/services/storage.service'

export class Store {
	constructor(initialState) {
		this.listeners = []

		this.storageService = new StorageService()
		const savedUser = this.storageService.getItem(USER_STORAGE_KEY)

		const state = savedUser ? { user: savedUser } : initialState

		this.state = new Proxy(state, {
			set: (target, property, value) => {
				target[property] = value

				this.notify()
				return true
			}
		})
	}
	static getInstance() {
		if (!Store.instance) {
			Store.instance = new Store({ user: null })
		}
		return Store.instance
	}

	addListener(listener) {
		this.listeners.push(listener)
	}

	removeListener(listener) {
		this.listeners.filter(list => list !== listener)
	}

	notify() {
		for (const listener of this.listeners) {
			listener.update()
		}
	}

	login(user, accessToken) {
		this.state.user = user
		this.storageService.setItem(ACCESS_TOKEN_KEY, accessToken)
		this.storageService.setItem(USER_STORAGE_KEY, user)
	}

	logout(user, accessToken) {
		this.state.user = null
		this.storageService.removeItem(ACCESS_TOKEN_KEY, accessToken)
		this.storageService.removeItem(USER_STORAGE_KEY, user)
	}

	updateCard(card) {
		const oldUser = this.state.user
		const newUser = { ...oldUser, card }
		this.state.user = newUser
		this.storageService.setItem(USER_STORAGE_KEY, newUser)
	}
}
