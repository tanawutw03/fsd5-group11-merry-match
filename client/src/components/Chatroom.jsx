import PropTypes from "prop-types";
import ChakraButton from "./common/ChakraButton";

function Chatroom({ profile }) {
  console.log(profile);

  const dummyFunc = () => {
    console.log(`Send clikced`);
  };
  return (
    <div className="bg-black w-full h-full flex flex-col justify-between">
      <div className="flex justify-center items-start mt-10">
        <div className="bg-white text-red-500 rounded p-10">
          <h1>Now you and {profile.full_name} are Merry Match!</h1>
          <h1>
            You can message something nice and make a good conversation. Happy
            Merry!
          </h1>
        </div>
      </div>
      <div className="flex justify-between items-center p-4">
        <input
          type="text"
          className="border border-gray-300 px-4 py-2 rounded mr-2 w-full"
          placeholder="Message here..."
        />
        <ChakraButton name="Send" onClick={dummyFunc} />
      </div>
    </div>
  );
}

Chatroom.propTypes = {
  profile: PropTypes.object,
};

export default Chatroom;
