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

function CreatePackage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [packageDetails, setPackageDetails] = useState([]);
  const [newDetail, setNewDetail] = useState("");
  const [packageName, setPackageName] = useState("");
  const [merryLimit, setMerryLimit] = useState(0);
  const [price, setPrice] = useState(0);

  const handleAddDetail = () => {
    if (newDetail.trim() !== "") {
      setPackageDetails([...packageDetails, newDetail]);
      setNewDetail("");
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
      setSelectedFile(URL.createObjectURL(file));
    }
  };

  const handleDeleteIcon = () => {
    setSelectedFile(null);
  };

  const handleCreatePackage = async () => {
    // ... (Existing code)

    let iconUrl = null;
    let iconPath = null;

    // Upload icon to Supabase Storage
    if (selectedFile) {
      try {
        const { data: storageData, error: storageError } =
          await supabase.storage
            .from("iconPackage")
            .upload(
              `iconPackage/${Date.now()}_${selectedFile.name}`,
              selectedFile
            );

        console.log("Storage Data:", storageData);
        console.error("Storage Error:", storageError);

        if (storageError) {
          // Handle the error, e.g., show a message to the user
          return;
        }

        // Get the URL and path of the uploaded file
        iconUrl = storageData[0].url;
        iconPath = storageData[0].path;
      } catch (error) {
        console.error("Error uploading icon to storage:", error);
        // Handle the error, e.g., show a message to the user
        return;
      }
    }

    // Insert package data into the database
    const { data: packageData, error: packageError } = await supabase
      .from("packages")
      .insert([
        {
          name: packageName,
          merry_limit: merryLimit,
          price: price,
          description: packageDetails,
        },
      ]);

    if (packageError) {
      console.error("Error inserting package data:", packageError);
      // Handle the error, e.g., show a message to the user
      return;
    }

    // Insert icon data into the "icons" table
    const { data: iconData, error: iconError } = await supabase
      .from("icons")
      .insert([
        {
          name: packageName, // Set the name based on your requirement
          path: iconPath,
          package_id: packageData[0].id, // Assuming the "packages" table has an 'id' column
        },
      ]);

    if (iconError) {
      console.error("Error inserting icon data:", iconError);
      // Handle the error, e.g., show a message to the user
      return;
    }

    // Reset form fields or redirect to another page after successful creation
    setPackageName("");
    setMerryLimit(0);
    setPrice(0);
    setPackageDetails([]);
    setSelectedFile(null);

    console.log("Package data inserted successfully:", packageData);
    console.log("Icon data inserted successfully:", iconData);
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
              <button className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
                <img src={pack} className=" mr-[10px]" />
                Merry Package
              </button>
              <button className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
                <img src={complaint} className=" mr-[10px]" />
                Complaint{" "}
                <div className="grid place-items-center ml-auto justify-self-end">
                  <div className="relative grid items-center font-nunito font-bold uppercase whitespace-nowrap select-none bg-blue-500/20 text-blue-900 py-1 px-2 text-xs rounded-full">
                    <span className="">14</span>
                  </div>
                </div>
              </button>
            </nav>
          </div>
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-utility-white border-r border-solid border-gray-400 text-gray-700 w-full max-w-[20rem] p-4 ">
            <button className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
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
            <button className="flex p-3 w-[100px] text-[#95002B]  text-center font-Nunito text-[16px] font-bold leading-6 justify-center items-center space-x-2 rounded-full bg-[#FFE1EA]  shadow-md">
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
                      src={selectedFile}
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
                  accept="image/png, image/jpeg"
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
                      onChange={(e) => handleEditDetail(index, e.target.value)}
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
