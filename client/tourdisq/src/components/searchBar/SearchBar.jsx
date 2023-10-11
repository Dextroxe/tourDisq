import { HiLocationMarker } from "react-icons/hi";

const SearchBar = ({ filter, setFilter }) => {
  return (
    <div className="flexCenter search-bar">
      <HiLocationMarker color="var(--blue)" size={25} />
      <input
      placeholder="Search by title/city/country"
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{backgroundImage:"#bbd0ff;"}}
      />
      <button className="button">Search</button>
    </div>
  );
};

export default SearchBar;
