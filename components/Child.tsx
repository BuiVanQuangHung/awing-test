import {
  Box,
  Button,
  Checkbox,
  Divider,
  Grid,
  IconButton,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { Campaign, CampaingChild } from "./Parent";

interface ChildCampaignProps {
  campaign: Campaign;
  setCampaign: (data: Campaign) => void;
  error: boolean;
}
const ChildCampaign = (props: ChildCampaignProps) => {
  const { campaign, setCampaign, error } = props;
  const [indexItem, setIndexItem] = useState<number>(
    campaign.campaingChild.length
  );
  const [checkedAllStatus, setCheckedAllStatus] = useState(false);
  const [checkedStatus, setCheckedStatus] = useState(0);
  const checkErrorName = error && !campaign.campaingChild?.[indexItem - 1].name;

  // Hàm thêm Item +
  const handleAddCampaignChild = () => {
    const newIndexItem = campaign.campaingChild.length + 1;
    const newCampaignChild: CampaingChild = {
      id: newIndexItem,
      total: 0,
      name: `Chiến dịch con ${newIndexItem}`,
      status: true,
      subCampaigns: [
        {
          id: 1,
          name: "Quảng cáo 1",
          quantity: 0,
          status: false,
        },
      ],
    };
    setIndexItem(newIndexItem);
    setCampaign({
      ...campaign,
      campaingChild: [...campaign.campaingChild, newCampaignChild],
    });
  };

  // Hàm thay đổi dữ liệu là status và tên của Item +
  const handleChangeCampaignChildName = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    statusEvent?: boolean
  ) => {
    const { value } = event.target;
    const updatedCampaignChild = campaign.campaingChild.map((child, i) =>
      i === indexItem - 1
        ? {
            ...child,
            name: statusEvent ? child.name : value,
            status: statusEvent ? !child.status : child.status,
          }
        : child
    );
    setCampaign({
      ...campaign,
      campaingChild: updatedCampaignChild,
    });
  };

  // Click vô Item để show detail +
  const handleChangeCampaignChild = (index: number) => {
    setIndexItem(index + 1);
  };

  // Thêm Subcampign +
  const handleAddSubcampaign = () => {
    const updatedCampaignChild = [...campaign.campaingChild];
    const child = updatedCampaignChild[indexItem - 1];
    const subCampaigns = [...child.subCampaigns];
    const newIndexItem = subCampaigns.length + 1;
    const newSubCampaign = {
      id: newIndexItem,
      name: `Quảng cáo ${newIndexItem}`,
      quantity: 0,
      status: false,
    };
    subCampaigns.push(newSubCampaign);
    child.subCampaigns = subCampaigns;
    updatedCampaignChild[indexItem - 1] = child;
    setCampaign({
      ...campaign,
      campaingChild: updatedCampaignChild,
    });
  };

  // Xóa SubCampaign của danh sách +
  const handleDeleteSubCampaign = (index: number) => {
    const updatedCampaignChild = campaign.campaingChild.map((child, i) => {
      if (i !== indexItem - 1) {
        return child;
      }
      const updatedSubCampaigns = child.subCampaigns.filter(
        (subCampaign, j) => j !== index
      );
      return {
        ...child,
        subCampaigns: updatedSubCampaigns,
      };
    });

    setCampaign({
      ...campaign,
      campaingChild: updatedCampaignChild,
    });
  };

  // Thay đổi dữ liệu của các trường trong subCampaigns như quantity và name +
  const handleChangeSubCampaignDetail = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const { value, name } = event.target;
    const updatedCampaingChild = [...campaign.campaingChild];
    const updatedSubCampaigns = [
      ...updatedCampaingChild[indexItem - 1].subCampaigns,
    ];
    updatedSubCampaigns[index] = {
      ...updatedSubCampaigns[index],
      [name]: value,
    };
    updatedCampaingChild[indexItem - 1].subCampaigns = updatedSubCampaigns;
    setCampaign({
      ...campaign,
      campaingChild: updatedCampaingChild,
    });
  };

  //Băt sự kiện thay đổi ở input check box cao nhất
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setCheckedAllStatus(isChecked);
    const updatedCampaingChild = campaign.campaingChild.map((child, i) => {
      if (i !== indexItem - 1) {
        return child;
      }
      const updatedSubCampaigns = child.subCampaigns.map((subCampaign) => {
        return { ...subCampaign, status: isChecked };
      });
      return { ...child, subCampaigns: updatedSubCampaigns };
    });
    setCampaign({
      ...campaign,
      campaingChild: updatedCampaingChild,
    });
  };

  // Xóa tất cả các subCampaigns
  const handleDeleteSubCampaigns = () => {
    const updatedCampaignChild = campaign.campaingChild.map((child, i) => {
      if (i !== indexItem - 1) {
        return child;
      }
      const updatedSubCampaigns = child.subCampaigns.filter(
        (subCampaign, j) => j !== checkedStatus
      );
      return {
        ...child,
        subCampaigns: checkedStatus ? updatedSubCampaigns : [],
      };
    });
    setCheckedAllStatus(false);
    setCheckedStatus(0);
    setCampaign({
      ...campaign,
      campaingChild: updatedCampaignChild,
    });
  };

  // Thay đổi trạng thái ở check box từng ô
  const handleChangeCheckBoxSubCampaign = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const isChecked = event.target.checked;

    const updatedCampaingChild = campaign.campaingChild.map((child, i) => {
      if (i !== indexItem - 1) {
        return child;
      }
      const updatedSubCampaigns = child.subCampaigns.map((subCampaign, j) => {
        if (j === index) {
          return { ...subCampaign, status: isChecked };
        }
        return subCampaign;
      });
      return { ...child, subCampaigns: updatedSubCampaigns };
    });
    setCheckedAllStatus(isChecked);
    if (isChecked) {
      setCheckedStatus(index);
    } else {
      setCheckedStatus(0);
    }
    setCampaign({
      ...campaign,
      campaingChild: updatedCampaingChild,
    });
  };

  return (
    <React.Fragment>
      {/* Chiến dịch con */}
      <Box
        sx={{
          display: "flex",
          gap: "1rem",
          margin: "2rem 0",
        }}
      >
        <IconButton
          sx={{ width: "50px", height: "50px" }}
          onClick={handleAddCampaignChild}
          color="primary"
        >
          +
        </IconButton>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {/* Danh sách Item */}
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            {campaign.campaingChild.map((item, index) => {
              item.total = item.subCampaigns.reduce(
                (total, subCampaign) => total + Number(subCampaign.quantity),
                0
              );
              const checkErrorName = error && !item.total;
              return (
                <Box
                  key={item.id}
                  onClick={() => handleChangeCampaignChild(index)}
                  sx={{
                    padding: "2rem",
                    border: "1px solid #ccc",
                    borderRadius: "1rem",
                    minWidth: "130px",
                    minHeight: "50px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "1rem",
                    cursor: "pointer",
                    margin: "1rem 0",
                  }}
                >
                  <ListItemText
                    primary={item.name}
                    style={{ color: checkErrorName ? "red" : "black" }}
                  />
                  <CheckCircleIcon color={item.status ? "primary" : "action"} />
                  <Typography variant="h6">{item.total}</Typography>
                </Box>
              );
            })}
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "50vw",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            <TextField
              label="Tên chiến dịch con"
              value={campaign.campaingChild?.[indexItem - 1]?.name}
              onChange={(event) => handleChangeCampaignChildName(event)}
              margin="normal"
              error={checkErrorName}
              helperText={checkErrorName ? "Dữ liệu không hợp lệ" : ""}
              variant="standard"
              fullWidth
              required
            />
            <Checkbox
              checked={campaign.campaingChild?.[indexItem - 1]?.status}
              onChange={(event) => handleChangeCampaignChildName(event, true)}
            />
          </Box>
        </Box>
      </Box>

      {/* Danh sách chạy quảng cáo */}
      <Box sx={{ margin: "1rem" }}>
        <Typography variant="h5">Danh sách quảng cáo</Typography>
        {/* Tille Danh sách */}
        <Grid container sx={{ margin: "1rem 0" }}>
          <Grid item sm={1} xs={1} xl={1}>
            <Checkbox
              checked={
                campaign.campaingChild[indexItem - 1].subCampaigns.every(
                  (item) => item.status
                ) &&
                campaign.campaingChild[indexItem - 1].subCampaigns.length > 0
              }
              onChange={handleCheckboxChange}
              disabled={
                campaign.campaingChild[indexItem - 1].subCampaigns.length === 0
              }
            />
          </Grid>
          {checkedAllStatus ? (
            <Grid item sm={8} xs={8} xl={8}>
              <Button variant="text" onClick={handleDeleteSubCampaigns}>
                <DeleteIcon />
              </Button>
            </Grid>
          ) : (
            <>
              <Grid item sm={4} xs={4} xl={4}>
                <Typography variant="h6">Tên quảng cáo*</Typography>
              </Grid>
              <Grid item sm={4} xs={4} xl={4}>
                <Typography variant="h6"> Số lượng*</Typography>
              </Grid>
            </>
          )}

          <Grid
            item
            sm={3}
            xs={3}
            xl={3}
            sx={{ display: "flex", justifyContent: "end" }}
          >
            <Button variant="outlined" onClick={handleAddSubcampaign}>
              <Typography variant="h6">+ Thêm</Typography>
            </Button>
          </Grid>
        </Grid>
        <Divider />
        {/* List danh sách */}
        <>
          {campaign.campaingChild[indexItem - 1].subCampaigns.map(
            (item, index) => {
              const checkErrorName = error && !item.name;
              const checkErrorQuantity = error && !item.quantity;
              return (
                <Grid container key={item.id} spacing={2}>
                  <Grid item sm={1} xs={1} xl={1}>
                    <Checkbox
                      disabled={Boolean(checkedStatus)}
                      checked={
                        campaign.campaingChild?.[indexItem - 1].subCampaigns[
                          index
                        ]?.status
                      }
                      onChange={(event) =>
                        handleChangeCheckBoxSubCampaign(event, index)
                      }
                    />
                  </Grid>
                  <Grid item sm={4} xs={4} xl={4}>
                    <TextField
                      label="Tên Quảng cáo"
                      name="name"
                      value={item.name}
                      onChange={(event) =>
                        handleChangeSubCampaignDetail(event, index)
                      }
                      margin="normal"
                      error={checkErrorName}
                      variant="standard"
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item sm={4} xs={4} xl={4}>
                    <TextField
                      label="Số lượng"
                      name="quantity"
                      value={item.quantity}
                      onChange={(event) =>
                        handleChangeSubCampaignDetail(event, index)
                      }
                      error={checkErrorQuantity}
                      margin="normal"
                      variant="standard"
                      type="number"
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid
                    item
                    sm={3}
                    xs={3}
                    xl={3}
                    sx={{ display: "flex", justifyContent: "end" }}
                  >
                    <Button
                      variant="text"
                      disabled={Boolean(checkedStatus)}
                      onClick={() => handleDeleteSubCampaign(index)}
                    >
                      <DeleteIcon />
                    </Button>
                  </Grid>
                </Grid>
              );
            }
          )}
        </>
      </Box>
    </React.Fragment>
  );
};

export default ChildCampaign;
