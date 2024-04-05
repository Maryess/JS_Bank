/**
 * @param {Object} options
 * @param {string} options.path
 * @param {('GET'|'POST'|'PATCH'|'DELETE'|'PUT')} [options.method = 'GET']
 * @param {Object} [options.body = null]
 * @param {Object} [options.headers = {}]
 * @param {Function} [options.onSuccess = null]
 * @param {Function} [options.onError= null]
 * @returns {Promise <{isLoading:boolean,error:string|null,data:any|null}>}
 */

import { SERVER_URL } from '@/config/url.config'
import { ACCESS_TOKEN_KEY } from '@/constanst/auth.const'
import { NotificationService } from '@/core/services/notification.service'
import { StorageService } from '@/core/services/storage.service'
import { extractErrorMessage } from './extract-error-message'

export async function bankQuery({
	path,
	body = null,
	headers = {},
	method = 'GET',
	onError = null,
	onSuccess = null
}) {
	let isLoading = true,
		error = null,
		data = null
	const url = `${SERVER_URL}/api${path}`

	const accessToken = new StorageService().getItem(ACCESS_TOKEN_KEY)

	const requestOptions = {
		method,
		headers: {
			'Content-Type': 'application/json',
			...headers
		}
	}

	if (accessToken) {
		requestOptions.headers.Authorization = `Bearer ${accessToken}`
	}

	if (body) {
		requestOptions.body = JSON.stringify(body)
	}

	try {
		const response = await fetch(url, requestOptions)

		if (response.ok) {
			data = await response.json()

			if (onSuccess) {
				onSuccess(data)
			}
		} else {
			const errorData = await response.json()
			const errorMessage = extractErrorMessage(errorData)

			if (onError) {
				onError(errorMessage)
			}

			new NotificationService().show('error', errorMessage)
		}
	} catch (errorData) {
		const errorMessage = extractErrorMessage(errorData)
		if (onError) {
			onError(errorMessage)
		}
		new NotificationService().show('error', errorMessage)
	} finally {
		isLoading = false
	}

	return { isLoading, error, data }
}
