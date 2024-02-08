import logo from "../assets/AdminPage/logo.png";
import pack from "../assets/AdminPage/package.png";
import logout from "../assets/AdminPage/logout.png";
import complaint from "../assets/AdminPage/complaint.png";
import { Tooltip } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { Select } from "@chakra-ui/react";
import { Badge } from "@chakra-ui/react";

function AdminComplaint() {
  const navigate = useNavigate();
  const [complaintData, setComplainData] = useState([]);
  const [newComplaintCount, setNewComplaintCount] = useState(0);

  const handleRowClick = async (complaintId) => {
    const { data, error } = await supabase
      .from("complaints")
      .update({ status: "pending" })
      .eq("id", complaintId);

    if (error) {
      console.error("Error updating status:", error.message);
      return;
    }

    console.log("Status updated successfully:", data);
    navigate(`/complaint/${complaintId}`);
  };

  useEffect(() => {
    // Fetch data from Supabase or your backend API
    // Replace this with your actual Supabase query or API call
    const fetchData = async () => {
      // Example using Supabase

      const { data, error } = await supabase.from("complaints").select("*");
      if (error) {
        console.error("Error fetching data:", error);
      } else {
        setComplainData(data);
      }
    };
    async function fetchNewComplaintCount() {
      try {
        const { data: newComplaints, error } = await supabase
          .from("complaints")
          .select("*")
          .eq("status", "new");

        if (error) {
          console.error("Error fetching new complaints:", error.message);
          return;
        } else {
          setNewComplaintCount(newComplaints.length);
        }
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

  const handleIcon = () => {
    navigate("/adminpage");
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
                onClick={handleIcon}
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
            <div className="w-1/3">
              <Select placeholder="All status">
                <option value="new">New</option>
                <option value="panding">Pending</option>
                <option value="resloved">Resloved</option>
                <option value="Cancel">Cancel</option>
              </Select>
            </div>
          </div>
        </nav>
        <div className="m-[50px] border-solid border-[2px] border-zinc-500 rounded-2xl shadow-xl shadow-blue-gray-900/5 ">
          <TableContainer>
            <Table variant="striped" colorScheme="facebook">
              <TableCaption>Package Information</TableCaption>
              <Thead>
                <Tr>
                  <Th>#</Th>
                  <Th>User</Th>
                  <Th>Issue</Th>
                  <Th>Description</Th>
                  <Th>Date Submitted</Th>
                  <Th>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {complaintData.map((complaintItem, index) => (
                  <Tr
                    key={complaintItem.id}
                    onClick={() => handleRowClick(complaintItem.id)}
                  >
                    <Td isNumeric>{index + 1}</Td>
                    <Td>{complaintItem.fullname}</Td>
                    <Td>{complaintItem.issue}</Td>
                    <Td>{complaintItem.description}</Td>
                    <Td>{complaintItem.date_submitted}</Td>
                    <Td>
                      <Badge
                        colorScheme={
                          complaintItem.status === "new"
                            ? "red"
                            : complaintItem.status === "pending"
                            ? "yellow"
                            : complaintItem.status === "resolved"
                            ? "green"
                            : "gray"
                        }
                      >
                        {complaintItem.status}
                      </Badge>
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

export default AdminComplaint;
