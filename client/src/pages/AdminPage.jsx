import logo from "../assets/AdminPage/logo.png";
import pack from "../assets/AdminPage/package.png";
import logout from "../assets/AdminPage/logout.png";
import complaint from "../assets/AdminPage/complaint.png";
import { Tooltip } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import axios from "axios";
import { useUser } from "../app/userContext.js";

function AdminPage() {
  const navigate = useNavigate();
  const [packageData, setPackageData] = useState([]);
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
    // Fetch data from Supabase or your backend API
    // Replace this with your actual Supabase query or API call

    const fetchData = async () => {
      // Example using Supabase

      try {
        const response = await axios.get(`${baseURL}/admin/package`);
        setPackageData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    async function fetchNewComplaintCount() {
      try {
        const response = await axios.get(`${baseURL}/admin/complaint/news`);
        setNewComplaintCount(response.data.newComplaintCount);
      } catch (error) {
        console.error("Error fetching new complaints:", error.message);
      }
    }

    fetchNewComplaintCount();

    fetchData();
  }, []);

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

  const handleCancel = () => {
    navigate("/adminpage");
  };

  const handleAddPackageClick = () => {
    navigate("/createpackage");
  };

  const handleComplaint = () => {
    navigate(`/admincomplaint`);
  };

  const handleDelete = async (packageId) => {
    try {
      // Perform the delete operation using Axios
      const response = await axios.delete(
        `${baseURL}/admin/delete/package/${packageId}`
      );

      if (response.status === 200) {
        // Update the state to reflect the changes
        setPackageData((prevData) =>
          prevData.filter((item) => item.package_id !== packageId)
        );
        console.log("Package deleted successfully!");
      } else {
        console.error("Error deleting package:", response.data.error);
      }
    } catch (error) {
      console.error("Error during package deletion:", error);
      // Handle the error if needed
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
              <button
                className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
                onClick={handleComplaint}
              >
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
          <div className="flex flex-row flex-grow-0 justify-between px-2 w-5/12 gap-5">
            <div className="w-2/3">
              <InputGroup>
                <InputLeftAddon>
                  <Tooltip hasArrow label="Search" bg="gray.300" color="black">
                    <SearchIcon />
                  </Tooltip>
                </InputLeftAddon>
                <Input type="tel" placeholder="Search.." />
              </InputGroup>
            </div>
            <button
              className="flex p-3 w-[160px] text-white text-center font-Nunito text-[16px] font-bold leading-6 justify-center items-center space-x-2 rounded-full bg-[#C70039] shadow-md"
              onClick={handleAddPackageClick}
            >
              + Add Package
            </button>
          </div>
        </nav>
        <div className="m-[50px] border-solid border-[2px] border-zinc-500 rounded-2xl shadow-xl shadow-blue-gray-900/5 ">
          <TableContainer>
            <Table variant="striped" colorScheme="facebook">
              <TableCaption>Package Information</TableCaption>
              <Thead>
                <Tr>
                  <Th>#</Th>
                  <Th>Package Name</Th>
                  <Th>Package Icon</Th>
                  <Th>Price</Th>
                  <Th isNumeric>Merry Limit</Th>
                  <Th>Created At</Th>
                  <Th>Updated At</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {packageData.map((packageItem, index) => (
                  <Tr key={packageItem.package_id}>
                    <Td isNumeric>{index + 1}</Td>
                    <Td>{packageItem.name}</Td>
                    <Td>
                      <img
                        src={packageItem.iconurl}
                        className=" w-[50px] h-[50px]"
                      />
                    </Td>
                    <Td isNumeric>{packageItem.price}</Td>
                    <Td isNumeric>{packageItem.merry_limit}</Td>
                    <Td>{packageItem.created_at}</Td>
                    <Td>{packageItem.updated_at}</Td>
                    <Td>
                      {/* Edit Button */}
                      <Tooltip
                        hasArrow
                        label="Edit"
                        bg="gray.300"
                        color="black"
                      >
                        <Link to={`/editpackage/${packageItem.package_id}`}>
                          <Button variant="ghost" size="sm" color="pink.400">
                            <EditIcon />
                          </Button>
                        </Link>
                      </Tooltip>

                      {/* Delete Button */}
                      <Tooltip
                        hasArrow
                        label="Delete"
                        bg="gray.300"
                        color="black"
                      >
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(packageItem.package_id)}
                          color="pink.400"
                        >
                          <DeleteIcon />
                        </Button>
                      </Tooltip>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
