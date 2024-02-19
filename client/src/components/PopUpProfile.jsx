import { useState } from "react";
import { ViewIcon } from "@chakra-ui/icons";
import action from "../assets/Matching/action button.svg";
import heart from "../assets/Matching/heart button (1).svg";
import { ArrowForwardIcon, ArrowBackIcon } from "@chakra-ui/icons";
import location from "../assets/PopupProfile/location.png";

const PopUpProfile = ({fromData}) => {
  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState([]);
  const [preferencesData, setPreferencesData] = useState([]);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }
  
  // const preferencesData = [
  //   { title: "Sexual identities", value: "Male" },
  //   { title: "Sexual preferences", value: "Female" },
  //   { title: "Racial preferences", value: "Asian" },
  //   { title: "Meeting interests", value: "Friends" },
  // ];

  const transferData = () => {
    // Example: Transfer first two items from formData to preferencesData
    const transferredData = formData.slice(0, 2);
    setPreferencesData(transferredData);
  };

  return (
    <>
      <button onClick={toggleModal}>
        <ViewIcon color="white" />
      </button>

      {modal && (
        <div className="w-screen h-screen top-0 left-0 right-0 bottom-0">
          <div
            onClick={toggleModal}
            className="w-screen h-screen flex justify-center items-center fixed  top-0 left-0 right-0 bottom-0 bg-opacity-80 bg-gray-800"
          >
            <div className="absolute   bg-gray-200 p-4 rounded-md w-1/2 h-3/4 ">
              <button className=" absolute right-10" onClick={toggleModal}>
                X
              </button>
              <div className="flex justify-center items-center h-full p-4 border-purple-300 border-4  ">
                <div className=" flex   flex-col  h-full  border-red-600 border-4  ">
                  <div className="rounded-2xl  bg-black border-red-600 border-4 h-72 w-72 " />
                  <div className="flex flex-row justify-center items-center absolute bottom-24 left-32 ">
                    <img className=" w-12 h-12  " src={action} />
                    <img className=" w-12 h-12 " src={heart} />
                  </div>
                  <div className=" flex flex-row justify-between mt-4 ">
                    <div>
                      <p className="text-[#646D89]">1/2</p>
                    </div>
                    <div className=" flex flex-row  z-30   ">
                      <ArrowBackIcon w={5} h={5} color="gray" mr={4} />
                      <ArrowForwardIcon w={5} h={5} color="gray" />
                    </div>
                  </div>
                </div>
                <div className=" h-full w-1/2 pl-10 flex  border-purple-800 border-4 flex-row">
                  <div className="w-[418px] ">
                    <div className="flex ">
                      <p className="text-3xl font-bold mr-4 ">John Snow</p>
                      <p className="text-3xl font-bold  text-[#646D89] ">26</p>
                    </div>
                    <div className="flex">
                      <img className=" w-5 h-5 " src={location} />
                      <div className="flex  text-[#646D89]">
                        <p>Bankok</p>
                        <p>,</p>
                        <p>Thailand</p>
                      </div>
                    </div>
                    <div className=" flex flex-col ">
                      <div className="flex flex-col">
                        {preferencesData.map((preference, index) => (
                          <div key={index} className={`col${index + 1} flex`}>
                            <p className="w-[191px] text-[16px]">
                              {preference.title}
                            </p>
                            <p className="text-[#646D89]">{preference.value}</p>
                          </div>
                        ))}
                      </div>

                      <h1 className=" text-[24px]">About me</h1>
                      <div className="">
                        <p>I know nothing..but you</p>
                      </div>
                      <h1 className=" text-[24px]">Hobbies and Interests</h1>
                      <div className="flex ">
                        <div className="w-[86px] h-[40px] text-[#7D2262] border border-[#DF89C6] rounded-lg mr-2 flex items-center justify-center">
                          {" "}
                          <p> e-sport</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PopUpProfile;
