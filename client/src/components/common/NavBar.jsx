import { Button } from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem, Portal } from "@chakra-ui/react";
import logo from "../../assets/merryPackagePage/logo.svg";
import bell from "../../assets/merryPackagePage/Frame.svg";
import profile from "../../assets/Matching/profile.svg";
import ChakraButton from "../common/ChakraButton";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { handleLogout } from "../../app/auth.js";
import { useUser } from "../../app/userContext.js";

const NavBar = (props) => {
  const navigate = useNavigate();
  const { user, setUser, avatarUrl, setAvatarUrl } = useUser();

  const handleLogoutClick = async () => {
    handleLogout(user, setUser, avatarUrl, setAvatarUrl, navigate);
  };

  const MenuOrButton = props.useMenu ? (
    <Menu>
      <MenuButton>
        {avatarUrl ? (
          <img
            className="flex-shrink-0 w-[50px] h-[50px] rounded"
            src={avatarUrl}
            alt="User Avatar"
          />
        ) : (
          <img className="flex-shrink-0" src={profile} alt="Default Avatar" />
        )}
      </MenuButton>
      <Portal>
        <MenuList>
          <MenuItem>Menu 1</MenuItem>
          <MenuItem>New Window</MenuItem>
          <MenuItem>Open Closed Tab</MenuItem>
          <MenuItem onClick={handleLogoutClick}>Log out</MenuItem>
        </MenuList>
      </Portal>
    </Menu>
  ) : (
    <ChakraButton
      name={props.name}
      color={props.color}
      onClick={props.onClick}
    />
  );

  const handleFirstMenuClick = () => {
    if (props.onClickFirstMenu) {
      props.onClickFirstMenu();
    }
  };

  const handleSecondMenuClick = () => {
    if (props.onClickSecondMenu) {
      props.onClickSecondMenu();
    }
  };

  return (
    <>
      <nav>
        <ul className="nav-container flex  items-center  text-red-400 text-xl  text-center m-[20px]">
          <li className="merry-math-logo ml-[160px]">
            <img src={logo} />
          </li>
          <li className="start-matching-link font-nunito  font-bold ml-[520px]">
            <Button
              variant="link"
              colorScheme="custom"
              color="#191C77"
              onClick={handleFirstMenuClick}
            >
              {props.firstMenuName}
            </Button>
          </li>
          <li className="merry-membership-link font-nunito  font-bold mr-[24px]  ml-[35px]">
            <Button
              variant="link"
              colorScheme="custom"
              color="#191C77"
              onClick={handleSecondMenuClick}
            >
              {props.secondMenuName}
            </Button>
          </li>
          <div className="flex  ml-[20px]  ">
            {props.showBell && (
              <div className="flex mr-[10px] mt-5 justify-center items-center w-[48px] h-[48px] bg-[#F6F7FC] rounded-[999px] object-fit object-cover">
                <li>
                  <img
                    className="flex-shrink-0 w-[24px] h-[24px]  "
                    src={bell}
                  />
                </li>
              </div>
            )}
            <li className="mr-[160px] mt-5">{MenuOrButton}</li>
          </div>
        </ul>
      </nav>
    </>
  );
};

NavBar.propTypes = {
  useMenu: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  color: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  firstMenuName: PropTypes.string.isRequired,
  secondMenuName: PropTypes.string.isRequired,
  onClickFirstMenu: PropTypes.func.isRequired,
  onClickSecondMenu: PropTypes.func.isRequired,
  showBell: PropTypes.bool.isRequired,
  user: PropTypes.object,
  setUser: PropTypes.func,
};

export default NavBar;
