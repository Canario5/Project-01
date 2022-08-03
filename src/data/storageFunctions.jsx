export default function storageFunctions() {
	function saveToLocalStorage(data, storageString) {
		localStorage.setItem(storageString, JSON.stringify(data))
	}

	function removeLocalStorage() {
		localStorage.removeItem("LS_TextRazor_Texts")
	}

	function loadFromLocalStorage(storageString) {
		return JSON.parse(localStorage.getItem(storageString))
	}

	function saveToSessionStorage(data, storageString) {
		sessionStorage.setItem(storageString, JSON.stringify(data))
	}

	function loadFromSessionStorage(storageString) {
		return JSON.parse(sessionStorage.getItem(storageString))
	}

	return {
		saveToLocalStorage,
		removeLocalStorage,
		loadFromLocalStorage,
		saveToSessionStorage,
		loadFromSessionStorage,
	}
}
