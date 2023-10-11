import { useMutation, useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getProperty, removeBooking } from "../../utils/api";
import { PuffLoader } from "react-spinners";
import { AiFillHeart, AiTwotoneCar } from "react-icons/ai";
import "./Property.css";
import { FaShower } from "react-icons/fa";
import { MdLocationPin, MdMeetingRoom } from "react-icons/md";
import Map from "../../components/map/Map";
import { useState } from "react";
import BookingModal from "../../components/bookingModal/BookingModal";
import useAuthCheck from "../../hooks/useAuthCheck";
import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import UserDetailContext from "../../context/userDetailContext";
import { Button } from "@mantine/core";
import { toast } from "react-toastify";
import Heart from "../../components/heart/Heart";
import Disqus from "disqus-react"




const Property = () => {
  
  const { pathname } = useLocation();
  const id = pathname.split("/").slice(-1)[0];
  const { data, isError, isLoading } = useQuery(["resd", id], () =>
    getProperty(id)
  );

  const [modealOpen, setModalOpen] = useState(false);
  const { validateLogin } = useAuthCheck();
  const { user } = useAuth0();

  const {
    userDetails: { token, bookings },
    setUserDetails,
  } = useContext(UserDetailContext);

  const { mutate: cancelBooking, isLoading: cancelling } = useMutation({
    mutationFn: () => removeBooking(id, user?.email, token),
    onSuccess: () => {
      setUserDetails((prev) => ({
        ...prev,
        bookings: prev.bookings.filter((booking) => booking?.id !== id),
      }));

      toast.success("Your visit has been cancelled successfully");
    },
  });

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
  const disqusShortname = "TourDisq"
    const disqusConfig = {
      url: "https://buy-house-njqyk8sm2-dextroxe.vercel.app/",
      identifier: data.id,
      title: data.title,
    }
  return (
    <div className="wrapper">
      <div className="flecColStart paddings innerWidth property-container">
        {/* like button */}
        <div className="like">
          <Heart id={id} />
        </div>

        <img src={data?.image} alt="home image" />
       
        <div className="flexCenter property-details">
          {/* left side */}

          <div className="flexColStart left">
            {/* head */}
            <div className="flexStart head">
              <span className="primaryText">{data?.title}</span>
              <span
                className="orangeText"
                style={{ fontSize: "1.5rem" }}
              >Budget: {`$${data?.price}`}</span>
            </div>

            {/* facilities */}

            <div className="flexStart facilities">
              <div className="flexStart facility">
                <FaShower size={20} color="#1F3E72" />
                <span>{data?.facilities?.bathrooms} Bathrooms |</span>
              </div>
              <div className="flexStart facility">
                <AiTwotoneCar size={20} color="#1F3E72" />
                <span>{data?.facilities?.parkings} Parkings |</span>
              </div>
              <div className="flexStart facility">
                <MdMeetingRoom size={20} color="#1F3E72" />
                <span>{data?.facilities?.bedrooms} Bedrooms</span>
              </div>
            </div>
            
            {/* description */}
            <span className="secondaryText" style={{ textAlign: "justify" }}>
              {data?.description}
            </span>
            {/* address */}
            <div className="flexStart" style={{ gap: "1rem" }}>
              <MdLocationPin size={25} />
              <span className="secondryText">
                {data?.address}{" | "}
                {data?.city}{" | "}
                {data?.country}{" "}
              </span>
            </div>

            {/* booking button */}

            {bookings?.map((booking) => booking.id).includes(id) ? (
              <>
                <Button
                  variant="outline"
                  w={"100%"}
                  color="red"
                  onClick={() => cancelBooking()}
                  disabled={cancelling}
                >
                  <span>Cancel</span>
                </Button>
                <span>
                  your visit date is{" "}
                  {bookings?.filter((booking) => booking?.id === id)[0].date}
                </span>
              </>
            ) : (
              <button
                className="button"
                onClick={() => {
                  validateLogin() && setModalOpen(true);
                }}
              >
                Visit Here
              </button>
            )}

            {/* modal */}
            <BookingModal
              opened={modealOpen}
              setOpened={setModalOpen}
              propertyId={id}
              email={user?.email}
            />
          </div>
          {/* right side */}

          <div className="map">
            <Map
              address={data?.address}
              city={data?.city}
              country={data?.country}
            />
          </div>
        </div>
      <div className="article-container">

        <Disqus.DiscussionEmbed
          shortname={disqusShortname}
          config={disqusConfig}
        />
      </div>

      </div>


    </div>
  );
};

export default Property;
