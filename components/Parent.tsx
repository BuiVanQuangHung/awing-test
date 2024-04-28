"use client";

import React, { FC, useState } from "react";
import { Box, Button, Divider, Tab, Tabs, TextField } from "@mui/material";
import ChildCampaign from "./Child";

export interface CampaingChild {
  id: number;
  name: string;
  status: boolean;
  total: number;
  subCampaigns: {
    id: number;
    name: string;
    quantity: number;
    status: boolean;
  }[];
}
export interface Campaign {
  information: {
    name: string;
    describe?: string;
  };
  campaingChild: CampaingChild[];
}

const initialCampaign: Campaign = {
  information: {
    name: "",
    describe: "",
  },
  campaingChild: [
    {
      id: 1,
      name: "Chiến dịch con 1",
      status: true,
      total: 0,
      subCampaigns: [
        {
          id: 1,
          name: "Quảng cáo 1",
          quantity: 0,
          status: false,
        },
      ],
    },
  ],
};

const Parent: FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [campaign, setCampaign] = useState<Campaign>(initialCampaign);
  const [error, setError] = useState(false);
  const checkErrorName = error && !campaign.information.name;

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const handleChangeTab = (event: any, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleNameChange = (event: any) => {
    const { value, name } = event.target;
    setCampaign((prevState) => ({
      ...prevState,
      information: {
        ...prevState.information,
        [name]: value,
      },
    }));
  };
  const handleSubmit = () => {
    const checkDataInfor = !campaign.information.name;
    const checkDataDetail = campaign.campaingChild.some(
      (item) => !item.name || !item.total
    );

    if (checkDataDetail && checkDataInfor) {
      alert("Vui lòng điền đúng và đầy đủ thông tin");
    } else {
      alert(JSON.stringify(campaign));
    }
    setError(true);
  };

  return (
    <Box>
      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{ margin: "1rem" }}
      >
        Submit
      </Button>
      <Divider />
      <Box
        m={5}
        sx={{ border: "1px solid #ccc", borderRadius: "1rem", padding: "1rem" }}
      >
        <Tabs
          value={activeTab}
          onChange={handleChangeTab}
          sx={{ borderBottom: 1, borderColor: "divider" }}
        >
          <Tab label="Thông tin" {...a11yProps(0)} />
          <Tab label="Chiến dịch con" {...a11yProps(1)} />
        </Tabs>
        {activeTab ? (
          <ChildCampaign
            campaign={campaign}
            setCampaign={setCampaign}
            error={error}
          />
        ) : (
          <Box p={1}>
            <TextField
              fullWidth
              label="Tên chiến dịch"
              name="name"
              value={campaign.information.name}
              onChange={handleNameChange}
              error={checkErrorName}
              helperText={checkErrorName ? "Dữ liệu không hợp lệ" : ""}
              margin="normal"
              variant="standard"
              required
            />
            <TextField
              fullWidth
              label="Mô tả"
              name="describe"
              value={campaign.information.describe}
              onChange={handleNameChange}
              margin="normal"
              variant="standard"
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Parent;
