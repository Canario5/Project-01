import StringPieGraph from "../components/StringPieGraph"

import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import textStats from "../data/textStats"

import "./Dashboard.css"

export default function Dashboard(props) {
	const { wordStats, stringStats } = textStats()
	return (
		<Container className="dash-container">
			<Row className="my-3 md-auto">
				<Col md={4} lg={3} xl={2} className="side-menu ">
					<Row>Dashboard</Row>
					<Row>Administration</Row>
					<Row>Important things</Row>
					<Row>Other fancy things</Row>
					<Row>Just another line</Row>
					<Row>Just another line #2</Row>
				</Col>
				<Col md={8} lg={9} xl={10} className="dash-main">
					<div className="dash-headline">
						<div>Your profile</div>
					</div>
					<div className="d-flex flex-row justify-content-around">
						<div className="dash-box d-flex justify-content-center align-items-center">
							<div>
								<div className="box-count">87</div>
								<h5>Texts total</h5>
							</div>
						</div>
						<div className="dash-box d-flex justify-content-center align-items-center">
							<div>
								<div className="box-count">1354</div>
								<h5>Words total</h5>
							</div>
						</div>
					</div>

					<Row>
						<Col lg={6}>
							<StringPieGraph
								/* name={"Text stats"} */ data={stringStats(props.responseText)}
							/>
						</Col>
						<Col lg={6}>
							<StringPieGraph
								/* name={"Word stats"} */ data={wordStats(props.responseText)}
							/>
						</Col>
					</Row>
				</Col>
			</Row>
		</Container>
	)
}
