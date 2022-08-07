import textStats from "../data/textStats"
import typeStats from "../data/typeStats"
import StringPieGraph from "../components/StringPieGraph"
import TypePieGraph from "../components/TypePieGraph"
/* import TypeAreaGraph from "../components/TypeAreaGraph" */

import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

export default function Graphs(props) {
	const { wordStats, stringStats } = textStats()

	return (
		<main style={{ padding: "1rem 0" }}>
			<Row
				style={{ display: props.responseText ? "none" : "" }}
				xs="auto"
				className="justify-content-center align-items-center"
			>
				<span>You must load the texts first.</span>
			</Row>

			<Container fluid="md" className="my-3">
				<TypePieGraph name={"Top entity types"} data={typeStats(props.responseText)} />
			</Container>

			<Container fluid="md" className="my-3">
				<Row className="row-cols-1 row-cols-md-2">
					<Col>
						<StringPieGraph name={"Word stats"} data={wordStats(props.responseText)} />
					</Col>
					<hr className={"mt-4 mb-3 d-block d-md-none"} />
					<Col>
						<StringPieGraph name={"Text stats"} data={stringStats(props.responseText)} />
					</Col>
				</Row>
			</Container>
		</main>
	)
}
