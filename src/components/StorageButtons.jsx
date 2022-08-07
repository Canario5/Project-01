import storageFunctions from "../data/storageFunctions"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"

export default function StorageButtons(props) {
	const { saveToLocalStorage, removeLocalStorage, loadFromLocalStorage } =
		storageFunctions()

	return (
		<Container
			style={{
				display:
					loadFromLocalStorage("LS_TextRazor_Texts") || props.responseText ? "" : "none",
			}}
			className="my-3"
		>
			<Button
				className="m-1"
				variant="success"
				title="Save data to your local storage to save api calls."
				onClick={() => saveToLocalStorage(props.responseText, "LS_TextRazor_Texts")}
			>
				Save to local storage
			</Button>
			<Button
				className="m-1"
				variant="info"
				title="Load your saved data instead api call."
				onClick={() => props.setResponseText(loadFromLocalStorage("LS_TextRazor_Texts"))}
			>
				Load from local storage
			</Button>
			<Button className="m-1" variant="warning" onClick={() => removeLocalStorage()}>
				Delete local storage
			</Button>
			<Button
				className="m-1"
				variant="secondary"
				onClick={() => console.log(loadFromLocalStorage("LS_TextRazor_Texts"))}
			>
				console.log LS
			</Button>
		</Container>
	)
}
