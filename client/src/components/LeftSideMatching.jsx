import seach from "../assets/Matching/search.svg";
import person1 from "../assets/Matching/person1.svg";
import person2 from "../assets/Matching/person2.svg";
import person3 from "../assets/Matching/person3.svg";

const LeftSideMatching = () => {
  return (
    <div className="w-[314px] h-[500px] flex-col flex mr-5 ">
      <div className=" flex flex-col items-center  mt-7 ">
        <div className=" flex  flex-col justify-center items-center w-[282px] h-[187px] border-[#A62D82] border rounded-[16px]">
          <img className="w-[55px] h-[55px]" src={seach} />
          <h1 className="text-xl font-bold text-[#95002B]">
            Discover New Match
          </h1>
          <p className="text-xs h-[42px] w-[234px] text-center">
            Start find and Merry to get know and connect with new friend!.
          </p>
        </div>
      </div>
      <div className="mt-10 ml-5">
        <h1 className="text-xl font-bold">Merry Match!</h1>
        <div className="flex flex-row mt-3 ">
          <img className="w-[65px] h-[65px]" src={person1} />
          <img className="w-[65px] h-[65px] ml-2" src={person2} />
        </div>
      </div>
      <div className="mt-5 ml-5">
        <h1 className="text-xl font-bold">Chat with Merry Match</h1>
        <div className="flex flex-row mt-3">
          <img className="w-[50px] h-[50px]" src={person3} />
          <div className="ml-3">
            <p>Ygritte</p>
            <p>You know nothing Jon Snow</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSideMatching;
