import { Button } from "@chakra-ui/react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Portal,
  MenuDivider,
} from "@chakra-ui/react";
import logo from "../../assets/merryPackagePage/logo.svg";
import bell from "../../assets/MenuButton/bell.svg";
import profile from "../../assets/Matching/profile.svg";
import ChakraButton from "../common/ChakraButton";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { handleLogout } from "../../app/auth.js";
import { useUser } from "../../app/userContext.js";
import { extendTheme } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import star from "../../assets/MenuButton/star.svg";
import person from "../../assets/MenuButton/Frame.svg";
import heart from "../../assets/MenuButton/hart.svg";
import box from "../../assets/MenuButton/box.svg";
import warn from "../../assets/MenuButton/warn.svg";
import logout from "../../assets/MenuButton/logout.svg";
const NavBar = (props) => {
  const navigate = useNavigate();
  const { user, setUser, avatarUrl, setAvatarUrl } = useUser();

  const handleLogoutClick = async () => {
    handleLogout(user, setUser, avatarUrl, setAvatarUrl, navigate);
  };
  const theme = extendTheme({
    colors: {
      login: {
        500: "#C70039",
      },
    },
  });
  const handleClick = () => {
    navigate("/package");
  };
  const images = [
    { src: person, name: "Profile" },
    { src: heart, name: "Merry list" },
    { src: box, name: "Merry Membership" },
    { src: warn, name: "Compliant" },
  ];
  const MenuOrButton = props.useMenu ? (
    <Menu>
      <MenuButton>
        {avatarUrl ? (
          <img
            className=" w-[50px] h-[50px] rounded-full  "
            src={avatarUrl}
            alt="User Avatar"
          />
        ) : (
          <img src={profile} alt="Default Avatar" />
        )}
      </MenuButton>
      <Portal>
        <MenuList w="198px" h="258px">
          <MenuItem display="flex" alignItems="center" justifyContent="center">
            <Button onClick={handleClick} colorScheme="whiteAlpha">
              <div className="w-[179px] h-[41px]  rounded-full bg-gradient-to-r from-[#742138] to-[#A878BF] flex flex-row justify-center items-center">
                <img className=" w-4 h-4 mr-2  " src={star} />
                <span className=" text-white  text-sm">More limit Merry!</span>
              </div>
            </Button>
          </MenuItem>
          {images.map((image, index) => (
            <MenuItem key={index}>
              <img className="w-4 h-4 mr-2 " src={image.src} alt={image.name} />
              <span className="text-[#646D89] text-sm">{image.name}</span>
            </MenuItem>
          ))}
          <MenuDivider />
          <MenuItem onClick={handleLogoutClick}>
            <img className="w-4 h-4 mr-2" src={logout} alt="Logout" />
            <span>Log out</span>
          </MenuItem>
        </MenuList>
      </Portal>
    </Menu>
  ) : (
    <ChakraProvider theme={theme}>
      <ChakraButton
        colorScheme="login"
        name={props.name}
        onClick={props.onClick}
        rounded="99px"
        width="90px"
        height="48px"
      />
    </ChakraProvider>
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
      <nav className=" w-screen  flex  items-center  justify-between ">
        <ul className="pl-32">
          <img src={logo} />
        </ul>
        <ul className=" flex flex-row items-center justify-center">
          <li className=" font-nunito  font-bold   ">
            <Button
              variant="link"
              colorScheme="custom"
              color="#191C77"
              onClick={handleFirstMenuClick}
            >
              {props.firstMenuName}
            </Button>
          </li>
          <li className=" font-nunito  font-bold pl-10 ">
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
              <div className="flex mr-[10px]  ">
                <Menu>
                  <MenuButton>
                    <img className=" w-[48px] h-[48px]  " src={bell} />
                  </MenuButton>
                  <MenuList></MenuList>
                </Menu>
              </div>
            )}
            <li className="mr-[160px]  ]">{MenuOrButton}</li>
          </div>

          {props.showBell && (
            <div className="pl-10  ">
              <Menu>
                <MenuButton>
                  <img src={bell} />
                </MenuButton>
                <MenuList></MenuList>
              </Menu>
            </div>
          )}
          <li className="pl-2 pr-32  ">{MenuOrButton}</li>
        </ul>
      </nav>
    </>
  );
};

NavBar.propTypes = {
  useMenu: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
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
