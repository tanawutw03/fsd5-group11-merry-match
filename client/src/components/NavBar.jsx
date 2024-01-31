import { Button } from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem, Portal } from "@chakra-ui/react";
import logo from "../assets/merryPackagePage/logo.svg";
import bell from "../assets/merryPackagePage/Frame.svg";
import profile from "../assets/Matching/profile.svg";

const NavBar = () => {
  return (
<<<<<<< HEAD
    <>
      <nav className="">
        <ul className="nav-container flex  items-center  text-red-400 text-xl  text-center m-[20px]">
          <li className="merry-math-logo ml-[160px]">
            <img src={logo} />
          </li>
          <li className="start-matching-link font-nunito  font-bold ml-[360px]">
            <Button variant="link" colorScheme="custom" color="#191C77">
              Start Matching
            </Button>
          </li>
          <li className="merry-membership-link font-nunito  font-bold mr-[24px]  ml-[28px]">
            <Button variant="link" colorScheme="custom" color="#191C77">
              Merry Membership
            </Button>
          </li>
          <div className="flex ">
            <div className="flex mr-[12px] justify-center items-center w-[48px] h-[48px] bg-[#F6F7FC] rounded-[999px] object-fit object-cover">
              <li>
                <img className="flex-shrink-0 w-[24px] h-[24px] " src={bell} />
              </li>
            </div>
            <li className="mr-[160px]">
              <Menu>
                <MenuButton>
                  <img className="flex-shrink-0  " src={profile} />
                </MenuButton>
                <Portal>
                  <MenuList>
                    <MenuItem>Menu 1</MenuItem>
                    <MenuItem>New Window</MenuItem>
                    <MenuItem>Open Closed Tab</MenuItem>
                    <MenuItem>Log out</MenuItem>
                  </MenuList>
                </Portal>
              </Menu>
=======
    <nav className="">
      <ul className="nav-container flex  items-center  text-red-400 text-xl  text-center m-[20px]">
        <li className="merry-math-logo ml-[160px]">
          <img src={logo} />
        </li>
        <li className="start-matching-link font-nunito  font-bold ml-[360px]">
          <Button variant="link" colorScheme="custom" color="#191C77">
            Start Matching
          </Button>
        </li>
        <li className="merry-membership-link font-nunito  font-bold mr-[24px]  ml-[28px]">
          <Button variant="link" colorScheme="custom" color="#191C77">
            Merry Membership
          </Button>
        </li>
        <div className="flex ">
          <div className="flex mr-[12px] justify-center items-center w-[48px] h-[48px] bg-[#F6F7FC] rounded-[999px] object-fit object-cover">
            <li>
              <img
                className="flex-shrink-0 w-[24px] h-[24px] "
                src={bell}
                alt=""
              />
>>>>>>> 68eb034 (feat:add components sidebar)
            </li>
          </div>
        </ul>
      </nav>
    </>
  );
};
