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
import { extractErrorMessage } from './extract-error-message'

export async function bankQuery({
	path,
	method = 'GET',
	body = null,
	headers = {},
	onSuccess = null,
	onError = null
}) {
	let isLoading = false
	let error = null
	let data = null
	const url = `${SERVER_URL}/api${path}`

	const accessToken = ''

	const requestOptions = {
		method,
		headers: {
			'Content-Type': 'application/json',
			...headers
		}
	}

	if (accessToken) {
		requestOptions.headers.Authorization = `	Bearer ${accessToken}`
	}

	if (body) {
		requestOptions.body = JSON.stringify(body)
	}

	try {
		const response = await fetch(url, requestOptions)
		if (response.ok) {
			data = response.json()
			if (onSuccess) {
				onSuccess(data)
			} else {
				const errorData = await response.json()
				const errorMessage = extractErrorMessage(errorData)
				if (errorMessage) {
					onError(errorMessage)
				}
			}
		}
	} catch (errorData) {
		const errorMessage = extractErrorMessage(errorData)

		if (errorMessage) {
			onError(errorMessage)
		}
	} finally {
		isLoading = false
	}

	return { isLoading, error, data }
}
