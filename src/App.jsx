import { useState, useRef, useEffect } from "react"
import { Outlet } from "react-router-dom"

import Form from "react-bootstrap/Form"
import Menu from "./navigation/Menu"
import apiData from "./api/api"

import "./App.css"
/* import { Button } from "react-bootstrap" */
import Button from "react-bootstrap/Button"

export default function App() {
	const [formText, setFormText] = useState()
	const [responseText, setResponseText] = useState()
	const fileRef = useRef()

	console.log(formText)
	console.log(responseText)
	useEffect(() => {
		console.log("useEffect #1")
		/* if (formText) getData(formText).then((apiData) => setResponseText(apiData)) */
	}, [formText])

	async function getData(formData) {
		let data = []
		for (const textRow of formData) {
			const returnedData = await apiData(textRow)
			data = [...data, { origText: textRow, entities: returnedData }]
		}
		return data
	}

	async function inputForm() {
		const textData = await fileRef.current.files[0].text()
		const splitPerRow = await textData.split("\n")
		setFormText(splitPerRow)
	}

	return (
		<div className="App">
			<Menu></Menu>
			<Outlet />
			<Form.Group onChange={inputForm} controlId="formFile" className="mb-3">
				<Form.Label>Default file input example</Form.Label>
				<Form.Control type="file" ref={fileRef} /* as="textarea" */ />
			</Form.Group>
			<Button variant="primary">Primary</Button>{" "}
			<Button variant="secondary">Secondary</Button>{" "}
			<Button variant="success">Success</Button> <Button variant="warning">Warning</Button>{" "}
			<Button variant="danger">Danger</Button> <Button variant="info">Info</Button>{" "}
			<Button variant="light">Light</Button> <Button variant="dark">Dark</Button>{" "}
			<Button variant="link" onClick={() => console.log(responseText)}>
				Link
			</Button>
		</div>
	)
}
