import MerryCards from "../components/MerryCards";
import NavBar from "../components/NavBar";
import LeftSideMatching from "../components/LeftSideMatching";
function Matching() {
  return (
    <>
      <NavBar />
      <div className="flex flex-row mt-10 ">
        <LeftSideMatching />
        <MerryCards />
      </div>
    </>
  );
}

export default Matching;
