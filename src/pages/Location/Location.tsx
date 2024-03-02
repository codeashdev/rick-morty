import React, { useState, useEffect, useMemo } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";

import "./Location.scss";
import { fetchLocations } from "../../services/services";
import { LocationType } from "../../types/type";
import LocationCard from "../../Components/LocationCard/LocationCard";

const Location: React.FC = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const searchParams = new URLSearchParams(location.search);
	const urlPage = parseInt(searchParams.get("page") || "1");

	const [page, setPage] = useState(urlPage);
	const [numPages, setNumPages] = useState(() => {
		if (window.innerWidth < 340) {
			return 2;
		}
		return window.innerWidth < 500 ? 3 : 5;
	});

	const { isPending, isError, error, data, isFetching } = useQuery({
		queryKey: ["locationData", page],
		queryFn: () => fetchLocations(page),
		placeholderData: keepPreviousData,
	});

	const totalPages = data?.info?.pages || 1;

	const pagesToDisplay = useMemo(() => {
		const currentPageIndex = page;
		const start = Math.max(1, currentPageIndex - Math.floor(numPages / 2));
		const end = Math.min(totalPages, start + numPages - 1);

		return Array.from({ length: end - start + 1 }, (_, i) => start + i);
	}, [numPages, page, totalPages]);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 340) {
				setNumPages(2);
			} else if (window.innerWidth < 500) {
				setNumPages(3);
			} else {
				setNumPages(5);
			}
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	useEffect(() => {
		navigate(`/?page=${page}`);
	}, [page, navigate]);

	if (isPending) {
		return <span>Loading...</span>;
	}

	if (isFetching) {
		return <span>Fetching....</span>;
	}

	if (isError) {
		return <span>Error: {error.message}</span>;
	}
	return (
		<div>
			{isPending ? (
				<div>Loading...</div>
			) : isError ? (
				<div>Error: {(error as Error).message}</div>
			) : (
				<div className="location-container">
					{data.results.map((location: LocationType) => (
						<div key={location.id} className="location-card">
							<Link to={`/character/${location.id}`}>
								<LocationCard {...location} />
							</Link>
						</div>
					))}
				</div>
			)}
			<div className="pagination-container">
				{page !== 1 && (
					<button
						className="pagination-btn"
						onClick={() => setPage((old) => Math.max(old - 1, 1))}
						type="button"
					>
						Previous
					</button>
				)}
				{pagesToDisplay.map((pageNumber) => (
					<button
						key={`page-${pageNumber}`}
						className={`pagination-btn ${pageNumber === page ? "active" : ""}`}
						onClick={() => setPage(pageNumber)}
						disabled={pageNumber === page}
						type="button"
					>
						{pageNumber}
					</button>
				))}
				{page !== totalPages && (
					<button
						className="pagination-btn"
						onClick={() => setPage((old) => Math.min(old + 1, totalPages))}
						type="button"
					>
						Next
					</button>
				)}
			</div>
			<Tooltip id="my-tooltip" />
		</div>
	);
};

export default Location;
