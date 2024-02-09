import MerryCards from "../components/MerryCards";
import NavBar from "../components/common/NavBar";
import LeftSideMatching from "../components/LeftSideMatching";

import { useNavigate } from "react-router-dom";
import SearchMatching from "../components/SearchMatching";

function Matching() {
  const navigate = useNavigate();

  return (
    <>
      <div className=" w-max ">
        <NavBar
          firstMenuName="Start Matching!"
          secondMenuName="Merry Membership"
          name="login"
          color="red"
          showBell="true"
          useMenu="true"
          onClickFirstMenu={() => navigate("/matching")}
          onClickSecondMenu={() => navigate("/package")}
        />

        <div className="flex flex-row">
          <div>
            <LeftSideMatching />
          </div>
          <div>
            <MerryCards />
          </div>
          <div>
            <SearchMatching />
          </div>
        </div>
      </div>
    </>
  );
}

export default Matching;
