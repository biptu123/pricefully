import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { CiShop } from "react-icons/ci";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { useNavigate } from "react-router-dom";
import { useFirbase } from "../../context/Firebase";

const SideMenu = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const firebase = useFirbase();
  const { data, isLoggedIn, updateData } = firebase;

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  const navigate = useNavigate();
  return (
    <>
      <Sidebar
        style={{
          height: "100vh",
          position: "fixed",
          zIndex: 2,
          backgroundColor: "white",
        }}
        collapsed={!isSidebarOpen}
      >
        <Menu>
          <div
            style={{
              textAlign: "end",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <MenuItem onClick={toggleSidebar}>
              {isSidebarOpen ? (
                <IoIosArrowDropleftCircle />
              ) : (
                <IoIosArrowDroprightCircle />
              )}
            </MenuItem>
          </div>
          <MenuItem onClick={() => navigate("/dashboard")} icon={<CiShop />}>
            Dashboard
          </MenuItem>
          <MenuItem onClick={() => navigate("/see-all")} icon={<CiShop />}>
            All
          </MenuItem>
          <MenuItem onClick={() => navigate("/zone")} icon={<CiShop />}>
            Zone
          </MenuItem>
          <MenuItem onClick={() => navigate("/market")} icon={<CiShop />}>
            Market
          </MenuItem>
          <div style={{ height: "300px", overflowY: "scroll" }}>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Dealer Name</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  Object.keys(data).map((key) => (
                    <tr key={key}>
                      <td>{data[key]["Dealer Name"]}</td>
                      <td>{data[key]["price"]}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </Menu>
      </Sidebar>
    </>
  );
};

export default SideMenu;
