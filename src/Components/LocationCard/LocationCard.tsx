import { IoMdPerson } from "react-icons/io";
import { LocationType } from "../../types/type";

const LocationCard = (location: LocationType) => {
	return (
		<>
			<div className="location-header">
				<p className="location-name">{location.name}</p>
				<p
					className="resident-count"
					data-tooltip-id="my-tooltip"
					data-tooltip-content="Resident Count"
				>
					<IoMdPerson size={15} /> {location.residents.length}
				</p>
			</div>
			<p className="location-info">
				<span>Type:</span> {location.type}
			</p>
			<p className="location-info">
				<span>Dimension:</span> {location.dimension}
			</p>
		</>
	);
};
export default LocationCard;
