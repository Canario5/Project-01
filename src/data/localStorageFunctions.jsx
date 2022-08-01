export default function localStorageFunctions() {
	function saveToLocalStorage(data) {
		localStorage?.setItem("LS_TextRazor_Texts", JSON.stringify(data))
	}

	function removeLocalStorage() {
		localStorage?.removeItem("LS_TextRazor_Texts")
	}

	function loadFromLocalStorage() {
		return JSON.parse(localStorage?.getItem("LS_TextRazor_Texts"))
	}

	return [saveToLocalStorage, removeLocalStorage, loadFromLocalStorage]
}
