import { Modal, Button } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useContext, useState } from "react";
import { useMutation } from "react-query";
import UserDetailContext from "../../context/userDetailContext";
import { bookVisit } from "../../utils/api.js";
import { toast } from "react-toastify";
import dayjs from "dayjs";

const BookingModal = ({ opened, setOpened, propertyId, email }) => {
  const [value, setValue] = useState(null);
  const {
    userDetails: { token },
    setUserDetails,
  } = useContext(UserDetailContext);
  // console.log(token)
  const handleBookingSuccess = () => {
    toast.success("Your visit has been booked successfully", {
      position: "top-center",
    });
    setUserDetails((prev) => ({
      ...prev,
      bookings: [
        ...prev.bookings,
        { id: propertyId, date: dayjs(value).format("DD/MM/YYYY") },
      ],
    }));
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: () => bookVisit(value, propertyId, email, token),
    onSuccess: () => handleBookingSuccess(),
    onError: ({ respones }) =>
      toast.error(respones.data.message, { position: "top-center" }),
    onSettled: () => setOpened(false),
  });
  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="Select your date of visit"
      centered
    >
      <div className="flexColCenter" style={{gap:"1rem"}}>
        <DatePicker value={value} onChange={setValue} minDate={new Date()} />
        <button disabled={!value || isLoading} onClick={() => mutate()} className="button">
          Book visit
        </button>
      </div>
    </Modal>
  );
};

export default BookingModal;
