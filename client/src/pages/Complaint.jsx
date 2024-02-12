import logo from "../assets/AdminPage/logo.png";
import pack from "../assets/AdminPage/package.png";
import logout from "../assets/AdminPage/logout.png";
import complaint from "../assets/AdminPage/complaint.png";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { useNavigate } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useParams } from "react-router-dom";
import { Badge } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import axios from "axios";

function ComplaintPage() {
  const navigate = useNavigate();
  const { complaint_Id } = useParams();
  const [complaintData, setComplaintData] = useState([]);
  const [newComplaintCount, setNewComplaintCount] = useState(0);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showResolveModal, setShowResolveModal] = useState(false);

  useEffect(() => {
    async function fetchComplaintData() {
      try {
        // Send a GET request to fetch complaint data by ID
        const response = await axios.get(
          `http://localhost:4008/admin/complaint/${complaint_Id}`
        );
        const complaintData = response.data;

        // Update the state with the fetched complaint data
        setComplaintData(complaintData);
      } catch (error) {
        console.error("Error fetching complaint data:", error.message);
      }
    }
    async function fetchNewComplaintCount() {
      try {
        const response = await axios.get(
          "http://localhost:4008/admin/complaint/news"
        );
        setNewComplaintCount(response.data.newComplaintCount);
      } catch (error) {
        console.error("Error fetching new complaints:", error.message);
      }
    }
    fetchNewComplaintCount();
    fetchComplaintData();
  }, [complaint_Id]);

  const handleOpenCancelModal = () => {
    setShowCancelModal(true);
  };

  const handleCloseCancelModal = () => {
    setShowCancelModal(false);
  };

  const handleOpenResolveModal = () => {
    setShowResolveModal(true);
  };

  const handleCloseResolveModal = () => {
    setShowResolveModal(false);
  };

  const handleCancel = () => {
    navigate("/adminpage");
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  };

  const handleCancelComplaint = async (complaintId) => {
    handleCloseCancelModal();
    try {
      // Make a PUT request to update the status of the complaint to "resolved"
      const response = await axios.put(
        `http://localhost:4008/admin/complaint/cancel/${complaintId}`,
        { complaintId }
      );

      // Check if the request was successful
      if (response.status === 200) {
        console.log("Status updated successfully:", response.data);
        navigate(`/admincomplaint`);
      } else {
        console.error("Error updating status:", response.data.error);
      }
    } catch (error) {
      console.error("Error updating status:", error.message);
    }
  };

  const handleResolveComplaint = async (complaintId) => {
    handleCloseResolveModal();
    try {
      // Make a PUT request to update the status of the complaint to "resolved"
      const response = await axios.put(
        `http://localhost:4008/admin/complaint/resolved/${complaintId}`,
        { complaintId }
      );

      // Check if the request was successful
      if (response.status === 200) {
        console.log("Status updated successfully:", response.data);
        navigate(`/admincomplaint`);
      } else {
        console.error("Error updating status:", response.data.error);
      }
    } catch (error) {
      console.error("Error updating status:", error.message);
    }
  };

  const handleComplaint = () => {
    navigate(`/admincomplaint`);
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
          <div className="text-gray-900 dark:text-white font-nunito text-2xl font-bold leading-7 tracking-tight flex flex-row">
            <button onClick={handleComplaint}>
              <ArrowBackIcon color="gray.500" />
            </button>
            <div className="mx-[20px] text-[#2A2E3F] text-[24px]">
              {complaintData.issue}
            </div>
            <div className="mx-[20px]">
              <Badge
                colorScheme={
                  complaintData.status === "new"
                    ? "red"
                    : complaintData.status === "pending"
                    ? "yellow"
                    : complaintData.status === "resolved"
                    ? "green"
                    : "gray"
                }
              >
                {complaintData.status}
              </Badge>
            </div>
          </div>
          <div className="flex flex-row flex-grow-0 justify-between px-2  gap-5">
            <button
              className="flex p-3 w-[200px] text-[#95002B]  text-center font-Nunito text-[16px] font-bold leading-6 justify-center items-center space-x-2 rounded-full bg-white  "
              onClick={handleOpenCancelModal}
            >
              Cancel Complaint
            </button>

            <button
              className="flex p-3 w-[200px]  text-white text-center font-Nunito text-[16px] font-bold leading-6 justify-center items-center space-x-2 rounded-full bg-[#C70039] shadow-md "
              onClick={handleOpenResolveModal}
            >
              Resolve Complaint
            </button>
          </div>
        </nav>
        <div className="m-[70px] border-solid border-[2px] bg-white border-zinc-500  shadow-xl shadow-blue-gray-900/5 flex flex-col justify-center items-start ">
          <div className="flex flex-row my-[40px] mx-[60px] items-end">
            <div className="text-[#646D89] text-[20px]">Complaint by:</div>
            <div className="text-[#000000] text-[16px] mx-[10px]">
              {complaintData.fullname}
            </div>
          </div>
          <div className="w-full text-center">
            <hr className="mx-[40px]" />
          </div>
          <div className="w-1/3 my-[40px] mx-[60px]">
            <div className="text-[#646D89] text-[20px] mb-[10px]">Issue</div>
            <div className="text-[#000000] text-[16px]">
              {complaintData.issue}
            </div>
          </div>
          <div className="w-1/3 my-[40px] mx-[60px]">
            <div className="text-[#646D89] text-[20px] mb-[10px]">
              Description
            </div>
            <div className="text-[#000000] text-[16px]">
              {complaintData.description}
            </div>
          </div>
          <div className="my-[40px] mx-[60px]">
            <div className="text-[#646D89] text-[20px] mb-[10px]">
              Date Submitted
            </div>
            <div className="text-[#000000] text-[16px]">
              {complaintData.date_submitted}
            </div>
          </div>
        </div>
      </div>
      {/* Modal for canceling complaint */}
      <Modal
        isOpen={showCancelModal}
        onClose={handleCloseCancelModal}
        size="lg"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cancel Complaint</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Do you sure to cancel this conplaint?</ModalBody>
          <ModalFooter>
            <div className="flex flex-row  justify-evenly w-full">
              <button
                className="flex p-3 w-fit  text-white text-center font-Nunito text-[16px] font-bold leading-6 justify-center items-center space-x-2 rounded-full bg-[#C70039] shadow-md "
                onClick={() => handleCancelComplaint(complaint_Id)}
              >
                Yes, cancel this complaint
              </button>

              <button
                className="flex p-3 w-fit text-[#95002B]  text-center font-Nunito text-[16px] font-bold leading-6 justify-center items-center space-x-2 rounded-full bg-[#FFE1EA]  shadow-md "
                onClick={handleCloseCancelModal}
              >
                No, give me more time
              </button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* Modal for resolving complaint */}
      <Modal
        isOpen={showResolveModal}
        onClose={handleCloseResolveModal}
        size="lg"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Resolve Complaint</ModalHeader>
          <ModalCloseButton />
          <ModalBody>This complaint is resolved?</ModalBody>
          <ModalFooter>
            <div className="flex flex-row  justify-evenly w-full">
              <button
                className="flex p-3 w-fit  text-white text-center font-Nunito text-[16px] font-bold leading-6 justify-center items-center space-x-2 rounded-full bg-[#C70039] shadow-md "
                onClick={() => handleResolveComplaint(complaint_Id)}
              >
                Yes, it has been resolved
              </button>

              <button
                className="flex p-3 w-fit text-[#95002B]  text-center font-Nunito text-[16px] font-bold leading-6 justify-center items-center space-x-2 rounded-full bg-[#FFE1EA]  shadow-md "
                onClick={handleCloseResolveModal}
              >
                No, it’s not
              </button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default ComplaintPage;
