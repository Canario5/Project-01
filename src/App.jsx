import { useState, useRef, useEffect } from "react"
import { Outlet } from "react-router-dom"

import Menu from "./navigation/Menu"
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

	/* 	console.log(formText)
	console.log(responseText) */
	useEffect(() => {
		console.log("useEffect #1")
		if (formText) getData(formText).then((apiData) => setResponseText(apiData))
	}, [formText])

	async function getData(formData) {
		let data = []
		for (const textRow of formData) {
			const returnedData = await apiData(textRow)
			const highlights = returnedData ? insertHighlights(textRow, returnedData) : false
			data = [
				...data,
				{ origText: textRow, highligtedText: highlights, entities: returnedData },
			]
		}
		console.log(data)
		return data
	}

	const insertHighlights = (origText, entities) => {
		console.log("tetet")

		/* let insertedHighlights
		entities.reverse().forEach((entity) => {
			const beforeInsert = origText.slice(0, entity.startingPos)
			const insert = `<span className="highlight">${entity.matchedText}</span>`
			const afterInsert = origText.slice(entity.endingPos)
			insertedHighlights = beforeInsert + insert + afterInsert
		})
		console.log(insertedHighlights)
		return insertedHighlights */
		console.log(entities.sort((a, b) => b.startingPos - a.startingPos))

		const insertedHighlights = entities
			.sort((a, b) => b.startingPos - a.startingPos)
			.reduce((text, entity) => {
				const beforeInsert = text.slice(0, entity.startingPos)
				const insert = `<span className="highlight">${entity.matchedText}</span>`
				const afterInsert = text.slice(entity.endingPos)
				return (text = beforeInsert + insert + afterInsert)
			}, origText)
		console.log(insertedHighlights)
		return insertedHighlights

		/* const testData = [
			{
				origText:
					"The hygiene package has given rise to debate in several Member States, including Sweden.\r",
				entities: [
					{
						id: 0,
						matchingTokens: [1],
						entityId: "Hygiene",
						freebaseTypes: [
							"/business/product_category",
							"/medicine/medical_treatment",
							"/film/film_subject",
							"/media_common/quotation_subject",
							"/medicine/disease_cause",
							"/book/book_subject",
							"/business/industry",
						],
						confidenceScore: 1.306,
						wikiLink: "http://en.wikipedia.org/wiki/Hygiene",
						matchedText: "hygiene",
						freebaseId: "/m/012sj0",
						relevanceScore: 0.0175,
						entityEnglishId: "Hygiene",
						startingPos: 4,
						endingPos: 11,
						wikidataId: "Q162297",
					},
					{
						id: 1,
						matchingTokens: [7],
						entityId: "Debate",
						freebaseTypes: [
							"/event/type_of_public_presentation",
							"/media_common/quotation_subject",
							"/education/fraternity_sorority_type",
						],
						confidenceScore: 0.9953,
						wikiLink: "http://en.wikipedia.org/wiki/Debate",
						matchedText: "debate",
						freebaseId: "/m/01xq3w",
						relevanceScore: 0.01528,
						entityEnglishId: "Debate",
						startingPos: 38,
						endingPos: 44,
						wikidataId: "Q179875",
					},
					{
						id: 2,
						type: ["Place", "PopulatedPlace", "Country"],
						matchingTokens: [14],
						entityId: "Sweden",
						freebaseTypes: [
							"/fictional_universe/fictional_setting",
							"/book/book_subject",
							"/biology/breed_origin",
							"/olympics/olympic_participating_country",
							"/periodicals/newspaper_circulation_area",
							"/travel/travel_destination",
							"/government/governmental_jurisdiction",
							"/food/beer_country_region",
							"/location/dated_location",
							"/government/political_district",
							"/symbols/flag_referent",
							"/business/employer",
							"/organization/organization_member",
							"/location/statistical_region",
							"/business/industry",
							"/sports/sport_country",
							"/symbols/coat_of_arms_bearer",
							"/location/country",
							"/organization/organization_founder",
							"/organization/organization_scope",
							"/government/government",
							"/sports/sports_team_location",
							"/military/military_combatant",
							"/location/location",
							"/film/film_location",
							"/royalty/kingdom",
						],
						confidenceScore: 3.529,
						wikiLink: "http://en.wikipedia.org/wiki/Sweden",
						matchedText: "Sweden",
						freebaseId: "/m/0d0vqn",
						relevanceScore: 0.01124,
						entityEnglishId: "Sweden",
						startingPos: 81,
						endingPos: 87,
						wikidataId: "Q34",
					},
				],
			},
			{
				origText:
					"In the great majority of cases, however, the problem has not been the legislation in itself but the implementation of the legislation by the national authorities.\r",
				entities: [
					{
						id: 0,
						matchingTokens: [15],
						entityId: "Legislation",
						freebaseTypes: ["/book/book_subject", "/business/consumer_product"],
						confidenceScore: 1.045,
						wikiLink: "http://en.wikipedia.org/wiki/Legislation",
						matchedText: "legislation",
						freebaseId: "/m/0dnxd",
						relevanceScore: 0.04029,
						entityEnglishId: "Legislation",
						startingPos: 70,
						endingPos: 81,
						wikidataId: "Q49371",
					},
					{
						id: 1,
						matchingTokens: [23],
						entityId: "Legislation",
						freebaseTypes: ["/book/book_subject", "/business/consumer_product"],
						confidenceScore: 1.185,
						wikiLink: "http://en.wikipedia.org/wiki/Legislation",
						matchedText: "legislation",
						freebaseId: "/m/0dnxd",
						relevanceScore: 0.04029,
						entityEnglishId: "Legislation",
						startingPos: 122,
						endingPos: 133,
						wikidataId: "Q49371",
					},
				],
			},
			{
				origText:
					"The EU is sacrificing public health for the sake of the profits of European monopolies, which are demanding fewer checks and restraints.",
				entities: [
					{
						id: 0,
						matchingTokens: [4, 5],
						entityId: "Public health",
						freebaseTypes: [
							"/organization/organization_sector",
							"/film/film_subject",
							"/government/governmental_jurisdiction",
							"/book/book_subject",
							"/education/field_of_study",
							"/medicine/medical_specialty",
							"/organization/non_profit_designation",
							"/award/award_discipline",
							"/location/location",
						],
						confidenceScore: 6.601,
						wikiLink: "http://en.wikipedia.org/wiki/Public_health",
						matchedText: "public health",
						freebaseId: "/m/02cm61",
						relevanceScore: 0.04279,
						entityEnglishId: "Public health",
						startingPos: 22,
						endingPos: 35,
						wikidataId: "Q189603",
					},
					{
						id: 1,
						matchingTokens: [14],
						entityId: "Monopoly",
						freebaseTypes: ["/book/book_subject"],
						confidenceScore: 0.9898,
						wikiLink: "http://en.wikipedia.org/wiki/Monopoly",
						matchedText: "monopolies",
						freebaseId: "/m/06_y046",
						relevanceScore: 0.2393,
						entityEnglishId: "Monopoly",
						startingPos: 76,
						endingPos: 86,
						wikidataId: "Q43637",
					},
				],
			},
		]
		console.log("run") */

		/* 	testData.map((rowData) => {
			if (!rowData?.entities) return

			const { origText } = rowData

			rowData.entities.reverse().forEach((entity) => {
				const beforeInsert = origText.slice(0, entity.startingPos)
				const insert = `<span className="highlight">${entity.matchedText}</span>`
				const afterInsert = origText.slice(entity.endingPos)
				rowData.highligtedText = beforeInsert + insert + afterInsert
			})
			console.log(rowData)
		}) */
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
				<Form.Text className="text-muted">
					The largest file that may be handled per request is 200 kilobytes.
				</Form.Text>
			</Form.Group>
			<Button variant="primary">Primary</Button>{" "}
			<Button variant="secondary">Secondary</Button>{" "}
			<Button variant="success">Success</Button> <Button variant="warning">Warning</Button>{" "}
			<Button variant="danger">Danger</Button> <Button variant="info">Info</Button>{" "}
			<Button variant="light">Light</Button> <Button variant="dark">Dark</Button>{" "}
			<Button variant="link" onClick={insertHighlights}>
				Link
			</Button>
		</div>
	)
}
