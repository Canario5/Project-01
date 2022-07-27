import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"

import { LinkContainer } from "react-router-bootstrap"

export default function Menu() {
	return (
		<Navbar bg="light" expand="lg">
			<Container>
				<LinkContainer to="/">
					<Navbar.Brand>Company</Navbar.Brand>
				</LinkContainer>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<LinkContainer to="/">
							<Nav.Link>Home</Nav.Link>
						</LinkContainer>

						{/* <LinkContainer to="/texts">
							<Nav.Link>Texts</Nav.Link>
						</LinkContainer> */}

						<LinkContainer to="/graphs">
							<Nav.Link>Graphs</Nav.Link>
						</LinkContainer>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}
