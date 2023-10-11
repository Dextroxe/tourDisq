import { useContext, useState } from "react";
import PropertyCard from "../../components/propertyCard/PropertyCard";
import SearchBar from "../../components/searchBar/SearchBar";
import useProperties from "../../hooks/useProperties";
import "../properties/Properties.css";
import { PuffLoader } from "react-spinners";
import userDetailContext from "../../context/userDetailContext";

const Favourites = () => {
  const { data, isError, isLoading } = useProperties();
  const [filter, setFilter] = useState("");
  const {
    userDetails: { favourites },
  } = useContext(userDetailContext);
  // console.log(data);

  if (isError) {
    return (
      <div className="wrapper">
        <span>Error while fetching data</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="wrapper flexCenter" style={{ height: "60vh" }}>
        <PuffLoader
          height={80}
          width={80}
          color="#4066ff"
          aria-label="puff-loading"
          radius={1}
        />
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div
        className="flexColCenter paddings 
            innerWidth properties-container"
      >
        <SearchBar filter={filter} setFilter={setFilter} />

        <div className="paddings flexCenter properties">
          {
            // data.map((card,i) => (<PropertyCard card={card} key={i}/>))
            data.filter((property) =>
            favourites.includes(property.id)
              ).filter(
                (property) =>
                  property.title.toLowerCase().includes(filter.toLowerCase()) ||
                  property.city.toLowerCase().includes(filter.toLowerCase()) ||
                  property.country.toLowerCase().includes(filter.toLowerCase())
              )
              .map((card, i) => (
                <PropertyCard card={card} key={i} />
              ))
          }
        </div>
      </div>
    </div>
  );
};

export default Favourites;
