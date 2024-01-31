import seach from "../assets/Matching/search.svg";
const LeftSideMatching = () => {
  return (
    <div className="w-[314px] h-[259px] flex flex-col justify-center items-center ml-10">
      <div className=" flex  flex-col justify-center items-center w-[282px] h-[187px] border-[#A62D82] border rounded-[16px]">
        <img className="w-[55px] h-[55px]" src={seach} />
        <h1 className="text-xl font-bold text-[#95002B]">Discover New Match</h1>
        <p className="text-xs h-[42px] w-[234px] text-center">
          Start find and Merry to get know and connect with new friend!.
        </p>
      </div>
      <h1>Merry Match!</h1>
      <h1>Chat with Merry Match</h1>
      <p>Ygritte</p>
      <p>You know nothing Jon Snow</p>
    </div>
  );
};

export default LeftSideMatching;
