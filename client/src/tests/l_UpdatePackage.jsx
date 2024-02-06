import React, { useState } from "react";
import axios from "axios";

export default function L_UpdatePackage() {
  const [newPackageName, setNewPackageName] = useState("");

  const updatePackageName = async () => {
    const packageId = "package_id";

    try {
      const response = await axios.put(
        `http://localhost:4008/api/package/${packageId}`,
        {
          name: newPackageName,
        }
      );

      console.log("Update successful:", response.data);
    } catch (error) {
      console.error("Update failed:", error.response.data);
    }
  };

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Enter new package name"
          value={newPackageName}
          onChange={(e) => setNewPackageName(e.target.value)}
        />
        <button onClick={updatePackageName}>Update Package Name</button>
      </div>
    </>
  );
}
