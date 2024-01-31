import logo from "../assets/AdminPage/logo.png";
import pack from "../assets/AdminPage/package.png";
import logout from "../assets/AdminPage/logout.png";
import complaint from "../assets/AdminPage/complaint.png";
import { Tooltip } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";
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

const packages = [
  {
    package_id: 1,
    package_name: "Standard Package",
    price: 29.99,
    package_detail: "Basic features with limited merry limit",
    merry_limit: 50,
    created_at: "2024-01-31T12:00:00Z",
    updated_at: "2024-01-31T14:30:00Z",
  },
  {
    package_id: 2,
    package_name: "Premium Package",
    price: 49.99,
    package_detail: "Enhanced features with higher merry limit",
    merry_limit: 100,
    created_at: "2024-01-30T15:45:00Z",
    updated_at: "2024-01-31T16:20:00Z",
  },
  {
    package_id: 3,
    package_name: "Ultimate Package",
    price: 79.99,
    package_detail: "All-inclusive features with unlimited merry limit",
    merry_limit: 200, // Unlimited
    created_at: "2024-01-29T09:10:00Z",
    updated_at: "2024-01-31T18:45:00Z",
  },
];
function AdminPage() {
  const handleAddPackageClick = () => {
    return <Navigate to="/createpackage" />;
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
                  <Th>Package ID</Th>
                  <Th>Package Name</Th>
                  <Th>Price</Th>
                  <Th isNumeric>Merry Limit</Th>
                  <Th>Created At</Th>
                  <Th>Updated At</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {packages.map((packageData) => (
                  <Tr key={packageData.package_id}>
                    <Td isNumeric>{packageData.package_id}</Td>
                    <Td>{packageData.package_name}</Td>
                    <Td isNumeric>{packageData.price}</Td>
                    <Td isNumeric>{packageData.merry_limit}</Td>
                    <Td>{packageData.created_at}</Td>
                    <Td>{packageData.updated_at}</Td>
                    <Td>
                      {/* Edit Button */}
                      <Tooltip
                        hasArrow
                        label="Edit"
                        bg="gray.300"
                        color="black"
                      >
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(packageData.package_id)}
                          color="pink.400"
                        >
                          <EditIcon />
                        </Button>
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
                          onClick={() => handleDelete(packageData.package_id)}
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
