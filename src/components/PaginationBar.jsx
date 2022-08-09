import Pagination from "react-bootstrap/Pagination"
import Row from "react-bootstrap/Row"

export default function PaginationBar(props) {
	if (!props.nrPages) return

	const pageNumbers = [...Array(props.nrPages)].map((_item, i) => (
		<Pagination.Item
			onClick={() => props.setCurrentPage(i + 1)}
			key={i}
			active={i + 1 === props.currentPage}
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
