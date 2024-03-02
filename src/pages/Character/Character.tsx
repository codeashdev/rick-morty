import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchCharactersByLocation } from "../../services/services";
import CharacterCard from "../../Components/CharacterCard/CharacterCard";

const Character = () => {
	const { id: stringId } = useParams<{ id: string }>();
	const id = Number(stringId);

	const { isPending, isError, error, data, isFetching } = useQuery({
		queryKey: ["locationData", id],
		queryFn: () => fetchCharactersByLocation(id),
		placeholderData: keepPreviousData,
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
		<div className="character-container">
			{!isFetching &&
				data.residents.map((residentUrls: string) => (
					<CharacterCard key={residentUrls} residentUrls={residentUrls} />
				))}
		</div>
	);
};
export default Character;
