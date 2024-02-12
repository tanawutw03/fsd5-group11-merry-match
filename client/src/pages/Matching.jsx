import MerryCards from "../components/MerryCards";
import NavBar from "../components/common/NavBar";
import LeftSideMatching from "../components/LeftSideMatching";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchMatching from "../components/SearchMatching";

function Matching() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState(null);

  const handleSearch = async (params) => {
    await setSearchParams(params);
  };

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
            <SearchMatching onSearch={handleSearch} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Matching;
