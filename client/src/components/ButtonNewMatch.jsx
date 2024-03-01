import { useNavigate } from "react-router-dom";
import seach from "../assets/Matching/search.svg";
import PropTypes from "prop-types";

function ButtonNewMatch({ onCloseChatroom }) {
  const navigate = useNavigate();

  const handleClick = () => {
    onCloseChatroom();
    navigate("/matching");
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className="flex flex-col justify-center items-center w-[282px] h-[187px] border-[#A62D82] border rounded-[16px]"
      >
        <img className="w-[55px] h-[55px]" src={seach} />
        <h1 className="text-xl font-bold text-[#95002B]">Discover New Match</h1>
        <p className="text-xs h-[42px] w-[234px] text-center">
          Start find and Merry to get know and connect with new friend!.
        </p>
      </button>
    </div>
  );
}

ButtonNewMatch.propTypes = {
  onCloseChatroom: PropTypes.func,
};

export default ButtonNewMatch;
