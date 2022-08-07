import { useState, useRef, useEffect } from "react"

import TextContent from "../components/TextContent"
import PaginationBar from "../components/PaginationBar"
import apiData from "../api/api"
import storageFunctions from "../data/storageFunctions"

import Spinner from "react-bootstrap/Spinner"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Container from "react-bootstrap/Container"

import "./TextUpload.css"

export default function TextUpload(props) {
	console.log(props)
	const { saveToLocalStorage, removeLocalStorage, loadFromLocalStorage } =
		storageFunctions()

	const [formText, setFormText] = useState()
	/* const [responseText, setResponseText] = useState() */
	const fileRef = useRef()
	const [isLoading, setIsLoading] = useState(false)

	const [currentPage, setCurrentPage] = useState(1)
	const [nrPages, setNrPages] = useState()
	const itemsPerPage = 10
	const indexOfLastItem = currentPage * itemsPerPage
	const indexOfFirstItem = indexOfLastItem - itemsPerPage

	useEffect(() => {
		console.log("useEffect #1")
		if (!formText) return
		getData(formText).then((apiData) => {
			props.setResponseText(apiData)
			setIsLoading(false)
		})
	}, [formText])

	useEffect(() => {
		console.log("useEffect #2")
		if (!props.responseText) return
		const value = Math.ceil(props.responseText.length / itemsPerPage)
		setNrPages(value)
	}, [props.responseText])

	async function getData(formData) {
		let data = []
		for (const [i, textRow] of formData.entries()) {
			const returnedData = await apiData(textRow)
			data = [...data, { origText: textRow, pos: i, entities: returnedData }]
		}
		return data
	}

	async function inputForm() {
		const textData = await fileRef.current?.files[0]?.text()
		if (!textData) return
		const splitPerRow = await textData.split("\n")
		setFormText(splitPerRow)
		setIsLoading(true)
	}

	function clearInput(event) {
		if (event.type === "contextmenu") {
			event.preventDefault()
			fileRef.current.value = null
			setCurrentPage(1)
			setNrPages(null)
		}
	}

	function genEle() {
		if (!props.responseText) return

		const currentRange = props.responseText.slice(indexOfFirstItem, indexOfLastItem)

		return currentRange?.map((item, i) => {
			const { entities, origText, pos } = item
			if (!entities)
				return <TextContent content={origText} elePos={pos + 1} key={i}></TextContent>

			let tempText = origText
			let highlights = ``

			const sortedEntities = entities
				.sort((a, b) => b.startingPos - a.startingPos)
				.map((entity, i) => {
					const { startingPos, endingPos, matchedText } = entity

					const insert = (
						<span
							className="highlight"
							title={`Entity: ${entity?.entityId ?? entity?.matchedText} \nType: ${
								entity?.type?.join(", ") ?? "No type found"
							}`}
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
					elePos={pos + 1}
					key={i}
				></TextContent>
			)
		})
	}

	const elem = genEle()

	return (
		<div className="App">
			<Form.Group controlId="formFile" className="col-sm-9 col-md-7 col-lg-6 my-4 mx-auto">
				<Form.Label>Upload your text file:</Form.Label>
				<Form.Control
					onContextMenu={clearInput}
					title={"Right click to clear"}
					type="file"
					ref={fileRef}
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
			</Form.Group>

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

			<div>{elem}</div>
			{nrPages && (
				<PaginationBar
					nrPages={nrPages}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
				></PaginationBar>
			)}
		</div>
	)
}
