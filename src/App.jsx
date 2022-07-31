import { useState, useRef, useEffect } from "react"
import { Outlet } from "react-router-dom"

import Menu from "./navigation/Menu"
import TextContent from "./components/TextContent"
import apiData from "./api/api"

import "./App.css"
/* import { Button } from "react-bootstrap" */
import Spinner from "react-bootstrap/Spinner"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Pagination from "react-bootstrap/Pagination"

export default function App() {
	const [formText, setFormText] = useState()
	const [responseText, setResponseText] = useState()
	const fileRef = useRef()
	/* const isLoading = formText && !responseText */
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		console.log("useEffect #1")
		if (formText)
			getData(formText).then((apiData) => {
				setResponseText(apiData)
				setIsLoading(false)
			})
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
		setIsLoading(true)
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
			if (!entities)
				return <TextContent content={origText} elePos={i + 1} key={i}></TextContent>

			let tempText = origText
			let highlights = ``

			const sortedEntities = entities
				.sort((a, b) => b.startingPos - a.startingPos)
				.map((entity, i) => {
					const { startingPos, endingPos, matchedText } = entity

					const insert = (
						<span
							className="highlight"
							title={`${entity?.type?.join(", ") ?? "No category found"}`}
							key={i}
						>
							{matchedText}
						</span>
					)

					const afterString = tempText.slice(endingPos)
					tempText = tempText.slice(0, startingPos)

					const merged = [insert, afterString, ...highlights]
					highlights = i === entities.length - 1 ? [tempText, ...merged] : merged
					return entity
				})
				.sort((a, b) => a.startingPos - b.startingPos)

			return (
				<TextContent
					content={highlights}
					entities={sortedEntities}
					elePos={i + 1}
					key={i}
				></TextContent>
			)
		})
	}

	const elem = genEle()

	return (
		<div className="App">
			<Menu></Menu>
			<Outlet />
			<Form.Group
				/* onChange={inputForm} */

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
				<Row xs="auto" className="justify-content-center">
					<Button onClick={inputForm} variant="primary" className="my-3 px-3" type="submit">
						Analyze Text
					</Button>
				</Row>

				{/* prettier-ignore */}
				<Row style={{ display: isLoading ? "" : "none" }} xs="auto" className="justify-content-center align-items-center">
				<Spinner animation="border" variant="primary" className="mx-2"/>
					Loading Please wait...
				</Row>

				{/* <div style={{ display: isLoading ? "inline" : "inline" }}>
				<Spinner animation="border" variant="primary" />
					Loading Please wait...
				</div> */}
			</Form.Group>

			<div>{elem}</div>
		</div>
	)
}
