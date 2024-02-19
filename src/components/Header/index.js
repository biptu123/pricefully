import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFirbase } from "../../context/Firebase";
import logo from "../../assets/images/logo.png";
import { FaHistory } from "react-icons/fa";
import { Modal } from "antd";
import DataTable from "react-data-table-component";

const Header = () => {
  const firebase = useFirbase();
  const navigate = useNavigate();
  const [visible, setvisible] = useState(false);
  const [tableData, setTableData] = useState([]);
  const { priceHistory } = firebase;

  useEffect(() => {
    if (!firebase.isLoggedIn) {
      navigate("/");
    }

    if (priceHistory) {
      const historyArray = Object.values(priceHistory).map((item) => item);
      const updatedTableData = historyArray.map((element, i) => {
        let rowData = {
          id: i + 1,
          zone: "------",
          market: "------",
          dealer: "------",
          updatedTo: element.info.updatedTo,
          price: element.price,
          timestamp: new Date(element.timestamp).toLocaleString(),
        };

        switch (element.info.target) {
          case "zone":
            rowData.zone = element.info.targetName;
            break;
          case "dealer":
            rowData.dealer = element.info.targetName;
            break;
          case "market":
            rowData.market = element.info.targetName;
            break;
        }

        return rowData;
      });

      setTableData(updatedTableData.reverse());
    }
  }, [firebase, navigate, priceHistory]);

  const columns = [
    {
      name: "Zone",
      selector: (row) => row.zone,
    },
    {
      name: "Market",
      selector: (row) => row.market,
    },
    {
      name: "Dealer",
      selector: (row) => row.dealer,
    },
    {
      name: "Updated to",
      selector: (row) => row.updatedTo,
    },
    {
      name: "Average Price",
      selector: (row) => row.price,
    },
    {
      name: "Time",
      selector: (row) => row.timestamp,
      sortable: true,
    },
  ];

  return (
    <nav className="navbar">
      <div className="">
        <div className="nav-logo">
          <img className="logoname" src={logo} alt="" />
        </div>
      </div>

      <div className="searchbox">
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Search"
            value={firebase.search}
            onChange={(e) => firebase.setSearch(e.target.value)}
          />
          <i className="fa fa-search" />
        </form>
        <FaHistory
          size={35}
          className="history-button"
          onClick={() => setvisible(true)}
        />
      </div>
      <Modal
        onCancel={() => setvisible(false)}
        open={visible}
        footer={null}
        width={1300}
      >
        <DataTable
          columns={columns}
          data={tableData}
          pagination
          highlightOnHover
          paginationPerPage={5}
          paginationRowsPerPageOptions={[]}
        />
      </Modal>
    </nav>
  );
};

export default Header;
