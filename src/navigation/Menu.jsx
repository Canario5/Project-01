import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"

import { Outlet } from "react-router-dom"
import { LinkContainer } from "react-router-bootstrap"

export default function Menu() {
	return (
		<>
			<Navbar /* bg="light" */ expand="lg" className="p-0 my-3">
				<Container>
					<LinkContainer to="/">
						<Navbar.Brand className="py-0">
							<div
								className="pt-2 px-4 text-light"
								style={{ paddingBottom: "0.65rem" }}
								id="logoBrand"
							>
								Company
							</div>
						</Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto mt-2 mt-lg-0">
							<LinkContainer to="/">
								<Nav.Link>Load text</Nav.Link>
							</LinkContainer>

							{/* <LinkContainer to="/texts">
								<Nav.Link>Texts</Nav.Link>
							</LinkContainer> */}

							<LinkContainer to="/graphs">
								<Nav.Link>Graphs</Nav.Link>
							</LinkContainer>

							<LinkContainer to="/third">
								<Nav.Link>Third</Nav.Link>
							</LinkContainer>
							<LinkContainer to="/fourth">
								<Nav.Link>Fourth</Nav.Link>
							</LinkContainer>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			<Outlet />
		</>
	)
}
