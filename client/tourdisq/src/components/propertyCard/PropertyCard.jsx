import "./PropertyCard.css";
import { AiFillHeart } from "react-icons/ai";
import {truncate} from 'lodash'
import { useNavigate } from "react-router-dom";
import Heart from "../heart/Heart";
const PropertyCard = ({ card }) => {

      const navigate = useNavigate();

  return (
    <div className="flexColStart r-card" onClick={()=>navigate(`../properties/${card.id}`)}>
      <Heart id={card?.id} />
      <div className="imgs" data={`${card.title}`}>
      <img src={card.image} alt="home" className="imgs" style={{borderRadius:"1rem 1rem 50% 1rem"}}/>
      </div>
      <span className="primaryText">{truncate(card.title,{length:15})} </span>
      {/* <span className="secondaryText r-price">
        <span style={{ color: "orange" }}>$</span>
        <span>{card.price}</span>
      </span> */}
      <span className="secondaryText">{truncate(card.description,{length:40})}</span>
    </div>
  );
}

export default PropertyCard;
