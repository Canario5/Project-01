import Pagination from "react-bootstrap/Pagination"
import Row from "react-bootstrap/Row"

export default function PaginationBar(props) {
	console.log(props)

	if (props?.nPages) return

	let active = props.currentPage

	const pageNumbers = [...Array(props.nPages)].map((_item, i) => (
		<Pagination.Item
			onClick={() => props.setCurrentPage(i + 1)}
			key={i + 1}
			active={i + 1 === active}
		>
			{i + 1}
		</Pagination.Item>
	))

	return (
		<Row xs="auto" className="justify-content-center">
			<Pagination>{pageNumbers}</Pagination>
		</Row>
	)
}
