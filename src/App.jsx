import { useState, useRef, useEffect } from "react"
import { Outlet } from "react-router-dom"

import Menu from "./navigation/Menu"
import TextContainer from "./components/TextContainer"
import apiData from "./api/api"

import "./App.css"
/* import { Button } from "react-bootstrap" */
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Pagination from "react-bootstrap/Pagination"

export default function App() {
	const [formText, setFormText] = useState()
	const [responseText, setResponseText] = useState()
	const fileRef = useRef()

	useEffect(() => {
		console.log("useEffect #1")
		if (formText) getData(formText).then((apiData) => setResponseText(apiData))
	}, [formText])

	async function getData(formData) {
		let data = []
		for (const textRow of formData) {
			const returnedData = await apiData(textRow)
			data = [...data, { origText: textRow, entities: returnedData }]
		}
		console.log(data)
		return data
	}

	async function inputForm() {
		const textData = await fileRef.current.files[0]?.text()
		if (!textData) return
		const splitPerRow = await textData.split("\n")
		setFormText(splitPerRow)
	}

	function clearInput(event) {
		if (event.type === "contextmenu") {
			event.preventDefault()
			fileRef.current.value = null
		}
	}

	function genEle() {
		return responseText?.map((item, i) => {
			const { entities, origText } = item
			if (!entities) return <div key={i}>{origText}</div>

			let tempText = origText
			let highlights = ``

			const allEntities = entities
				.sort((a, b) => b.startingPos - a.startingPos)
				.map((entity, i) => {
					const { startingPos, endingPos, matchedText } = entity

					// prettier-ignore
					const insert = <span className="highlight" key={i}>{matchedText}</span>
					const afterString = tempText.slice(endingPos)
					tempText = tempText.slice(0, startingPos)

					const merged = [insert, afterString, ...highlights]
					highlights = i === entities.length - 1 ? [tempText, ...merged] : merged

					/* tempHighlight = item.entities[i + 1]
						? [insertHighlight, afterString, ...tempHighlight]
						: [tempText, insertHighlight, afterString, ...tempHighlight] */
				})

			return <div key={i}>{highlights}</div>
		})
	}

	const elem = genEle()

	return (
		<div className="App">
			<Menu></Menu>
			<Outlet />
			<Form.Group
				onChange={inputForm}
				controlId="formFile"
				className="col-sm-9 col-md-7 col-lg-6 my-4 mx-auto"
			>
				<Form.Label>Upload your text file:</Form.Label>
				<Form.Control
					onContextMenu={clearInput}
					title={"Right click to clear"}
					type="file"
					ref={fileRef}
					className=""
					/* as="textarea" */
				/>
				<Form.Text className="text-muted">
					The largest file that may be handled per request is 200 kilobytes.
				</Form.Text>
			</Form.Group>
			<Button variant="primary">Primary</Button>{" "}
			<Button variant="secondary">Secondary</Button>{" "}
			<Button variant="success">Success</Button> <Button variant="warning">Warning</Button>{" "}
			<Button variant="danger">Danger</Button> <Button variant="info">Info</Button>{" "}
			<Button variant="light">Light</Button> <Button variant="dark">Dark</Button>{" "}
			<Button variant="link" onClick={console.log("test")}>
				Link
			</Button>
			<TextContainer></TextContainer>
			<div>{elem}</div>
		</div>
	)
}
