import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import Tab from "react-bootstrap/Tab"
import Tabs from "react-bootstrap/Tabs"

export default function TextContent(props) {
	const eleEntities = props?.entities?.map((entity, i) => {
		return (
			<Tab eventKey={entity.matchedText + i} title={entity.matchedText} key={i}>
				<Row className="my-3 row-cols-1 row-cols-md-2">
					<Col className="d-flex flex-column align-items-center">
						<Row>{`Entity name: ${entity?.matchedText ?? "No name found"}`}</Row>
						<Row>
							{
								<a href={entity?.wikiLink} target="_blank">
									Wikipedia
								</a>
							}
						</Row>
						<Row>{`Relevance Score: ${entity?.relevanceScore ?? "No score"}`}</Row>
						<Row>{`Confidence Score: ${entity?.confidenceScore ?? "No score"}`}</Row>
					</Col>
					<Col>{`DBPedia types: ${entity?.type?.join(", ") ?? "No category found"}`}</Col>
				</Row>
			</Tab>
		)
	})

	const disabledTab = (name) => (
		<Tab eventKey={`disabled${name}`} title={name} key={`disabled${name}`} disabled></Tab>
	)

	return (
		<Card>
			<Tabs defaultActiveKey="text" id="uncontrolled-tab-example">
				{props?.elePos && disabledTab(props.elePos)}
				<Tab eventKey="text" title="Text">
					<Card.Title className="my-4 mx-3 mx-sm-5">{props.content}</Card.Title>
				</Tab>
				{eleEntities ? eleEntities : disabledTab("No entity found")}
			</Tabs>
		</Card>
	)
}
