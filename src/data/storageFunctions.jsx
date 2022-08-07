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

	return {
		saveToLocalStorage,
		removeLocalStorage,
		loadFromLocalStorage,
	}
}
