import { useState, useRef, useEffect } from "react"
import { Outlet } from "react-router-dom"

import Form from "react-bootstrap/Form"
import Menu from "./navigation/Menu"
import getData from "./api/api"

import "./App.css"
/* import { Button } from "react-bootstrap" */
import Button from "react-bootstrap/Button"

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts"

export default function App() {
	const [rawText, setRawText] = useState()
	const [splitText, setSplitText] = useState()
	const [responseText, setResponseText] = useState()
	const fileRef = useRef()

	console.log(rawText)
	console.log(responseText)
	useEffect(() => {
		console.log("RERSS")
		if (rawText) getData(rawText).then((apiData) => setResponseText(apiData))
	}, [rawText])

	async function getTexts() {
		const textData = await fileRef.current.files[0].text()
		const splitPerRow = await textData.split("\n")
		setSplitText(splitPerRow)
		setRawText(textData)
	}

	const data = [
		{ name: "Page A", uv: 400, pv: 2400, amt: 2400 },
		{ name: "Page B", uv: 210, pv: 1000, amt: 2400 },
		{ name: "Page c", uv: 325, pv: 2400, amt: 2400 },
	]

	const renderLineChart = (
		<LineChart
			width={660}
			height={300}
			data={data}
			margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
		>
			<Line type="monotone" dataKey="uv" stroke="#8884d8" />
			<CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
			<XAxis dataKey="name" />
			<YAxis />
			<Tooltip />
		</LineChart>
	)

	return (
		<div className="App">
			<Menu></Menu>
			<Outlet />
			<Form.Group onChange={getTexts} controlId="formFile" className="mb-3">
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
			{renderLineChart}
		</div>
	)
}
