import { Avatar, Menu } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const ProfileMenu = ({ user, logout }) => {
  //   console.log(`${user?.username}`);
  const navigate = useNavigate();
  return (
    <Menu>
      <Menu.Target>
        <Avatar src={user?.picture} alt="user image" radius={"xl"} />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item onClick={() => navigate("./favourites", { replace: true })}>
          favourite
        </Menu.Item>

        <Menu.Item onClick={() => navigate("./bookings", { replace: true })}>
          visits
        </Menu.Item>

        <Menu.Item
          onClick={() => {
            localStorage.clear();
            logout();
          }}
        >
          logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
export default ProfileMenu;
