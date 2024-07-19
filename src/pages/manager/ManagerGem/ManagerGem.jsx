import { Button, Flex, Select, Table, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { toast } from "react-toastify";
import HeaderSearch from "../../../components/Header/HeaderSearch/HeaderSearch";
import GemModal from "../../../components/modal/GemModal";
import {
  createGem,
  getAllGem,
  getGemByBarcode,
  getGemByFilter,
  updateGem,
} from "../../../service/gem";
import useDebounce from "../../../hook/debound";

const userStatusOptions = [
  { value: "USE", label: "USE" },
  { value: "NOTUSE", label: "NOT USE" },
  { value: "PROCESDONE", label: "PROCESDONE" },
  { value: "FALSE", label: "FALSE" },
  { value: "PROCESSING", label: "PROCESSING" },
];

const ManagerGem = () => {
  const [gemData, setGemData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [dataUpdate, setDataUpdate] = useState(null);
  const [searchBarcode, setSearchBarcode] = useState("");
  const [selectUserValue, setSelectUserValue] = useState(
    userStatusOptions[0].value
  );
  const debouncedSearchBarcode = useDebounce(searchBarcode, 500);

  useEffect(() => {
    fetchAllGems();
  }, []);

  useEffect(() => {
    if (debouncedSearchBarcode) {
      fetchGemByBarcode(debouncedSearchBarcode);
    } else {
      fetchAllGems();
    }
  }, [debouncedSearchBarcode]);

  const fetchAllGems = async () => {
    try {
      const res = await getAllGem();
      setGemData(res.data);
    } catch (error) {
      toast.error("Error fetching all gems");
    }
  };

  const fetchGemByBarcode = async (barcode) => {
    try {
      const res = await getGemByBarcode({ barcode });
      if (res.data) {
        setGemData([res.data]);
        toast.success("Search by barcode succeeded");
      } else {
        toast.error("Gem not found");
      }
    } catch (error) {
      toast.error("Error fetching gem data");
    }
  };

  const handleSelectValue = async (value) => {
    setSelectUserValue(value);
    try {
      const res = await getGemByFilter({ userSelect: value });
      if (res.data && res.data.length > 0) {
        setGemData(res.data);
        toast.success("Search by filter succeeded");
      } else {
        toast.error("Gem not found");
      }
    } catch (error) {
      toast.error("Error fetching gem data");
    }
  };

  const handleReset = () => {
    setSearchBarcode("");
    setSelectUserValue(userStatusOptions[0].value);
    fetchAllGems();
  };

  const handleSave = async (values) => {
    try {
      let res;
      if (dataUpdate) {
        res = await updateGem({
          formData: values,
          gemBarcode: dataUpdate.gemBarcode,
          userStatus: values.userStatus,
        });
      } else {
        res = await createGem({ formData: values });
      }
      if (res) {
        dataUpdate
          ? toast.success("Update gem successfully")
          : toast.success("Create gem successfully");
        fetchAllGems();
      }
    } catch (error) {
      toast.error("Respond gem failed");
    } finally {
      setVisible(false);
    }
  };

  const columns = [
    { title: "BARCODE", dataIndex: "gemBarcode", key: "gemBarcode" },
    { title: "USERSTATUS", dataIndex: "userStatus", key: "userStatus" },
    { title: "DESCRIPTION", dataIndex: "description", key: "description" },
    {
      title: "CERTIFICATE CODE",
      dataIndex: "certificateCode",
      key: "certificateCode",
      render: (text) => <span>{text ? text : "0"}</span>,
    },
    { title: "CUT", dataIndex: "cut", key: "cut" },
    { title: "CARAT", dataIndex: "carat", key: "carat" },
    { title: "COLOR", dataIndex: "color", key: "color" },
    { title: "PRICE", dataIndex: "price", key: "price" },
    {
      title: "Action",
      key: "actions",
      render: (text, record) => (
        <Flex justify="center" align="center" gap={4}>
          <Tooltip title="Create Respond gem">
            <Button
              ghost
              type="primary"
              icon={<MdModeEditOutline />}
              onClick={() => {
                setVisible(true);
                setDataUpdate(record);
              }}
            />
          </Tooltip>
        </Flex>
      ),
    },
  ];

  return (
    <>
      <HeaderSearch
        onChange={(value) => setSearchBarcode(value)}
        searchValue={searchBarcode}
        placeholder="SEARCH BY barcode..."
      />
      <Flex gap={6} align="center" style={{ marginTop: "10px" }}>
        <Button
          type="primary"
          onClick={() => {
            setVisible(true);
            setDataUpdate(null);
          }}
        >
          Add New Gem
        </Button>
        <Select
          options={userStatusOptions}
          style={{ minWidth: "200px" }}
          value={selectUserValue}
          onChange={handleSelectValue}
        />
        <Button onClick={handleReset}>Reset</Button>
      </Flex>
      <Table
        style={{ marginTop: "10px" }}
        dataSource={gemData.reverse()}
        columns={columns}
        pagination={{ defaultPageSize: 4 }}
      />
      <GemModal
        visible={visible}
        onSave={handleSave}
        onCancel={() => setVisible(false)}
        type={dataUpdate ? "update" : "create"}
        initialData={dataUpdate}
      />
    </>
  );
};

export default ManagerGem;
