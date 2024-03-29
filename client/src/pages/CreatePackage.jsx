import logo from "../assets/AdminPage/logo.png";
import pack from "../assets/AdminPage/package.png";
import logout from "../assets/AdminPage/logout.png";
import complaint from "../assets/AdminPage/complaint.png";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { SmallAddIcon, SmallCloseIcon, DragHandleIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useUser } from "../app/userContext.js";

function CreatePackage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [packageDetails, setPackageDetails] = useState([]);
  const [newDetail, setNewDetail] = useState("");
  const [packageName, setPackageName] = useState("");
  const [merryLimit, setMerryLimit] = useState(0);
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();
  const [newComplaintCount, setNewComplaintCount] = useState(0);
  const { user, setUser, avatarUrl, setAvatarUrl } = useUser();
  const baseURL = import.meta.env.DEV
    ? import.meta.env.VITE_BASE_URL_DEV
    : import.meta.env.VITE_BASE_URL_PROD;

  if (user.user.role !== "admin") {
    navigate("/homepage");
    console.log("you not role admin");
  }

  useEffect(() => {
    async function fetchNewComplaintCount() {
      try {
        const response = await axios.get(`${baseURL}/admin/complaint/news`);
        setNewComplaintCount(response.data.newComplaintCount);
      } catch (error) {
        console.error("Error fetching new complaints:", error.message);
      }
    }

    fetchNewComplaintCount();
  }, []);

  const handleCancel = () => {
    // Navigate to the desired path (in this case, '/adminpage')
    navigate("/adminpage");
  };

  const handleAddDetail = () => {
    if (newDetail.trim() !== "") {
      const updatedDetails = [...packageDetails, newDetail];
      setPackageDetails(updatedDetails);
      setNewDetail("");
      console.log("After Adding Detail - packageDetails:", updatedDetails);
    }
  };

  const handleDeleteDetail = (index) => {
    const updatedDetails = [...packageDetails];
    updatedDetails.splice(index, 1);
    setPackageDetails(updatedDetails);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile({
        file,
        preview: URL.createObjectURL(file),
        fileExt: file.name.split(".").pop(),
      });
    }
  };

  const handleDeleteIcon = () => {
    setSelectedFile(null);
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      // Redirect to the login page after successful sign-out
      navigate("/login");
    } catch (error) {
      console.error("Error during sign-out:", error);
      // Handle the error if needed
    }
  };
  const handleCreatePackage = async () => {
    let iconUrl;
    const { file } = selectedFile;
    const uniqueIdentifier = file.name.split(".").pop();
    const fileName = `${Math.random()}.${uniqueIdentifier}`;
    const iconPath = `iconPackage/${fileName}`;
    // Upload icon to Supabase Storage
    if (selectedFile) {
      try {
        const { data: storageData, error: storageError } =
          await supabase.storage.from("iconPackage").upload(iconPath, file);

        console.log("Storage Data:", storageData);
        const { data: urlData, error } = await supabase.storage
          .from("iconPackage")
          .getPublicUrl(iconPath);

        if (error) {
          console.error("Error fetching icon URL:", error.message);
        } else {
          iconUrl = urlData.publicUrl;
        }

        if (storageError) {
          console.error("Storage Error:", storageError);
        }

        // Get the URL and path of the uploaded file
      } catch (error) {
        console.error("Error uploading icon to storage:", error);
        // Handle the error, e.g., show a message to the user
        return;
      }
    }

    const createPackageData = {
      name: packageName,
      merry_limit: merryLimit,
      price: price,
      description: packageDetails,
      iconurl: iconUrl,
    };
    // Insert package data into the database
    try {
      const response = await axios.post(
        `${baseURL}/admin/create/package`,
        createPackageData
      );
      // Reset form fields or redirect to another page after successful creation
      setPackageName("");
      setMerryLimit(0);
      setPrice(0);
      setPackageDetails([]);
      setSelectedFile(null);
      navigate("/adminpage");
    } catch (error) {
      console.error("Error inserting package data:", error.message);
      // Handle the error, e.g., show a message to the user
    }
  };
  return (
    <div className="flex flex-row justify-stretch min-w-[1440px]">
      <div className="sidebar">
        <nav className="row-span-2 shadow-xl shadow-blue-gray-900/5">
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-utility-white border-r border-solid border-gray-400 text-gray-700 h-[calc(100vh-6rem)] w-full max-w-[20rem] p-4 ">
            <div className="mb-2 p-4 flex flex-col items-center">
              <img src={logo} />
              <div className="text-gray-700 text-center font-nunito text-[16px] font-normal leading-relaxed">
                Admin Panel Control
              </div>
            </div>
            <nav className="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-nunito text-gray-700">
              <button
                className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
                onClick={handleCancel}
              >
                <img src={pack} className=" mr-[10px]" />
                Merry Package
              </button>
              <button className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
                <img src={complaint} className=" mr-[10px]" />
                Complaint{" "}
                <div className="grid place-items-center ml-auto justify-self-end">
                  <div className="relative grid items-center font-nunito font-bold uppercase whitespace-nowrap select-none bg-blue-500/20 text-blue-900 py-1 px-2 text-xs rounded-full">
                    <span className="">{newComplaintCount}</span>
                  </div>
                </div>
              </button>
            </nav>
          </div>
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-utility-white border-r border-solid border-gray-400 text-gray-700 w-full max-w-[20rem] p-4 ">
            <button
              className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
              onClick={handleLogout}
            >
              <img src={logout} className=" mr-[10px]" />
              Log Out
            </button>
          </div>
        </nav>
      </div>
      <div className="w-full bg-[#f6f7fc]">
        <nav className="col-span-10 bg-white w-full flex relative justify-between items-center mx-auto px-8 h-20 shadow-xl shadow-blue-gray-900/5">
          <div className="text-gray-900 dark:text-white font-nunito text-2xl font-bold leading-7 tracking-tight">
            Merry Package
          </div>
          <div className="flex flex-row flex-grow-0 justify-between px-2  gap-5">
            <button
              className="flex p-3 w-[100px] text-[#95002B]  text-center font-Nunito text-[16px] font-bold leading-6 justify-center items-center space-x-2 rounded-full bg-[#FFE1EA]  shadow-md"
              onClick={handleCancel}
            >
              Cancel
            </button>

            <button
              className="flex p-3 w-[100px]  text-white text-center font-Nunito text-[16px] font-bold leading-6 justify-center items-center space-x-2 rounded-full bg-[#C70039] shadow-md "
              onClick={handleCreatePackage}
            >
              Create
            </button>
          </div>
        </nav>
        <div className="m-[70px] border-solid border-[2px] bg-white border-zinc-500  shadow-xl shadow-blue-gray-900/5 flex flex-col justify-stretch ">
          <div className="flex flex-row justify-around ">
            <div className="w-1/3 m-[70px]">
              <FormControl isRequired>
                <FormLabel>Package name</FormLabel>
                <Input
                  placeholder="Package name"
                  value={packageName}
                  onChange={(e) => setPackageName(e.target.value)}
                />
              </FormControl>
            </div>
            <div className="w-1/3 m-[70px]">
              <FormControl isRequired>
                <FormLabel>Merry limit </FormLabel>
                <NumberInput
                  min={0}
                  value={merryLimit}
                  onChange={(value) => setMerryLimit(value)}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </div>
            <div className="w-1/3 m-[70px]">
              <FormControl isRequired>
                <FormLabel>Price </FormLabel>
                <NumberInput
                  min={10}
                  value={price}
                  onChange={(value) => setPrice(value)}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </div>
          </div>
          <div className="mx-[70px] ">
            <FormControl isRequired>
              <FormLabel>Icon</FormLabel>
              <label htmlFor="avatar">
                {selectedFile ? (
                  <div className=" relative">
                    <img
                      src={selectedFile.preview}
                      alt="Uploaded Icon"
                      className="w-[100px] h-[100px] object-cover"
                    />
                    <button
                      className="mt-2 p-1 text-[10px] text-white cursor-pointer absolute bg-[#af2758] top-[-20px] left-[90px] rounded-full w-[25px] h-[25px]"
                      onClick={handleDeleteIcon}
                    >
                      <SmallCloseIcon w={5} h={5} />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col justify-around bg-[#f6f7fc] w-[100px] h-[100px] items-center rounded-xl">
                    <SmallAddIcon w={10} h={10} color="#7D2262" />
                    <div className="text-[#7D2262] font-Nunito text-sm font-medium leading-6">
                      {selectedFile ? "Change icon" : "Upload icon"}
                    </div>
                  </div>
                )}
                <input
                  type="file"
                  id="avatar"
                  name="avatar"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </FormControl>
            <hr className="my-[70px] border-gray-300" />
            <div className="w-full m-[20px]">
              <FormControl isRequired>
                <FormLabel>Package Detail</FormLabel>
                {packageDetails.map((detail, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <DragHandleIcon />
                    <Input
                      value={detail}
                      onChange={(e) => setNewDetail(index, e.target.value)}
                      placeholder="Enter package detail..."
                      className="mr-2"
                    />
                    <button
                      className="p-1 text-sm text-[#C8CCDB] cursor-pointer"
                      onClick={() => handleDeleteDetail(index)}
                    >
                      delete
                    </button>
                  </div>
                ))}
                <div className="flex items-center">
                  <DragHandleIcon />
                  <Input
                    placeholder="Enter package detail..."
                    value={newDetail}
                    onChange={(e) => setNewDetail(e.target.value)}
                    className="mr-2"
                  />
                </div>
              </FormControl>
              <button
                className="w-[140px] h-[50px] text-[16px] text-[#95002B] rounded-full bg-[#FFE1EA] shadow-md p-4 m-[30px] flex justify-center items-center"
                onClick={handleAddDetail}
              >
                + Add detail
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePackage;
