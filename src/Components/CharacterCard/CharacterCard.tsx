import "./CharacterCard.scss";
import { useQuery } from "@tanstack/react-query";
import { fetchCharacterDetails } from "../../services/services";
interface CharacterCardProps {
	residentUrls: string;
}
const CharacterCard = ({ residentUrls }: CharacterCardProps) => {
	const { isFetching, isPending, isError, error, data } = useQuery({
		queryKey: ["resident", residentUrls],
		queryFn: () => fetchCharacterDetails(residentUrls),
		enabled: !!residentUrls,
	});

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
		<div className="character-card">
			<img className="character-image" src={data.image} alt={data.name} />
			<div className="character-details">
				<h2 className="character-name">{data.name}</h2>
				<div>
					<span
						className={`${
							data.status === "Alive"
								? "ss-alive"
								: data.status === "Dead"
								  ? "ss-dead"
								  : "ss-unknown"
						}`}
					/>
					<span> {data.status}</span>
				</div>
			</div>
		</div>
	);
};

export default CharacterCard;
