import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import Nav from "react-bootstrap/Nav"

import Tab from "react-bootstrap/Tab"
import Tabs from "react-bootstrap/Tabs"

export default function TextContent(props) {
	console.log(props)
	const eleEntities = props?.entities?.map((entity, i) => {
		return (
			<Tab eventKey={entity.matchedText + i} title={entity.matchedText} key={i}>
				<Container fluid="md">
					<Row>
						<Col>
							<Col>{`Entity name: ${entity?.matchedText ?? "No name found"}`}</Col>
							<Col>
								{
									<a href={entity?.wikiLink} target="_blank">
										Wikipedia
									</a>
								}
							</Col>
							<Col>{`Relevance Score: ${entity?.relevanceScore ?? "No score"}`}</Col>
							<Col>{`Confidence Score: ${entity?.confidenceScore ?? "No score"}`}</Col>
						</Col>
						<Col>{`DBPedia types: ${
							entity?.type?.join(", ") ?? "No categories found"
						}`}</Col>
					</Row>
				</Container>
			</Tab>
		)
	})

	return (
		<Card>
			<Tabs defaultActiveKey="text" id="uncontrolled-tab-example" className="mb-3">
				<Tab eventKey="text" title="Text">
					<Card.Title>{props.content}</Card.Title>
				</Tab>
				{eleEntities}
			</Tabs>
		</Card>
	)
}
