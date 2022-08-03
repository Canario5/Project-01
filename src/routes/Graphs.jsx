import { useState, useEffect } from "react"

import storageFunctions from "../data/storageFunctions"
import textStats from "../data/textStats"
import typeStats from "../data/typeStats"
import StringPieGraph from "../components/StringPieGraph"
import TypePieGraph from "../components/TypePieGraph"
/* import TypeAreaGraph from "../components/TypeAreaGraph" */

import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

export default function Graphs() {
	const { loadFromSessionStorage } = storageFunctions()
	const { wordStats, stringStats } = textStats()
	let [resData, setResData] = useState()

	useEffect(() => {
		setResData(loadFromSessionStorage("SS_TextRazor_Temp"))
	}, [])

	return (
		<main style={{ padding: "1rem 0" }}>
			<Row
				style={{ display: loadFromSessionStorage("SS_TextRazor_Temp") ? "none" : "" }}
				xs="auto"
				className="justify-content-center align-items-center"
			>
				<span>You must load the texts first.</span>
			</Row>

			<Container fluid="md" className="my-3">
				<TypePieGraph name={"Top entity types"} data={typeStats(resData)} />
			</Container>

			<Container fluid="md" className="my-3">
				<Row className="row-cols-1 row-cols-md-2">
					<Col>
						<StringPieGraph name={"Word stats"} data={wordStats(resData)} />
					</Col>
					<hr className={"mt-4 mb-3 d-block d-md-none"} />
					<Col>
						<StringPieGraph name={"Text stats"} data={stringStats(resData)} />
					</Col>
				</Row>
			</Container>
		</main>
	)
}
