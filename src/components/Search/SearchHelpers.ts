export const matchStrings = (input: string, value: string) => {
	for (let character = 0; character < value.length; character++) {
		if ((input.charAt(character)) !== value.charAt(character)) {
			return false
		}
	}

	return true
}

export const filteredValues = (data, query) => {
	const values = data.filter(item => {
		if (matchStrings((item.name).toLowerCase(), (query).toLowerCase())) {
			return item.name
		}
	})

	return values
}

// const setFormValue = (evt) => {
// 	if (evt === null) return ''
// 	if (evt.target) {
// 		return evt.target.value
// 		// setQuery(evt.target.value)
// 		// setValue(name, evt.target.value)
// 	}
// }

// const getFormValue = (item) => {
// 	if (item === null) return ''

// 	if (item.name) {
// 		setValue(name, item)
// 		setQuery(item.name)
// 	}
// }