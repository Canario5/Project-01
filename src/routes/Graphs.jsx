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
				style={{ display: loadFromSessionStorage("SS_TextRazor_Temp") ? "block" : "block" }}
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

/* function textStats(resData, retFce) {
	const stringsCount = resData?.length ?? 0

	const mergedStrings = resData
		.map((item) => item.origText)
		.join(", ")
		.replace(/[^a-zA-Z\s]+/g, "")
		.replace(/\s\s+/g, " ")
		.split(" ")

	const entitiesCountPerString = resData.map((item) =>
		item.entities ? item.entities.length : 0
	)

	const stringsWithEntities = entitiesCountPerString.reduce(
		(acc, cur) => (cur ? acc + 1 : acc),
		0
	)

	const entitiesCount = entitiesCountPerString.reduce((acc, cur) => acc + cur, 0)

	function wordStats() {
		const a1 = new Data(
			"Words not identified as entity",
			mergedStrings.length - entitiesCount
		)
		const a2 = new Data("Entities detected", entitiesCount)

		const b = new Data("Words analyzed", mergedStrings.length)
		return { data01: [a1, a2], data02: [b] }
	}

	function stringStats() {
		const a1 = new Data("Texts without entity", stringsCount - stringsWithEntities)
		const a2 = new Data("Texts containing entity", stringsWithEntities)

		const b = new Data("Texts analyzed", stringsCount)
		return { data01: [a1, a2], data02: [b] }
	}

	if (retFce === "wordStats") return wordStats()
	if (retFce === "stringStats") return stringStats()

	return [wordStats, stringStats]
} */

/* function typeStats(resData) {
	const allTypes = resData
		.flatMap((item) => (item.entities ? item.entities : false))
		.flatMap((entita) => (entita.type ? entita.type : false))
		.filter((type) => type)

	const obj = {}
	allTypes?.forEach((type) => {
		obj[type] ? obj[type]++ : (obj[type] = 1)
	})

	const sortedTypes = Object.entries(obj).sort((a, b) => b[1] - a[1])

	console.log(sortedTypes)

	const topTenTypes = sortedTypes.slice(0, 10)
	const topTenTypesCount = topTenTypes.reduce((acc, cur) => (acc = acc + cur[1]), 0)
	const outputTopTen = topTenTypes.map((item) => new Data(item[0], item[1]))

	return { data01: [...outputTopTen, new Data("Other", topTenTypesCount)] }
} */

/* function Data(name, value) {
	this.name = name
	this.value = value
} */
