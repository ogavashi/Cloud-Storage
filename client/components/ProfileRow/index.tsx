import { Typography } from "antd";
import React from "react";

type ProfileRowProps = {
  leftText: string;
  rightText: string;
  Icon: React.FC;
};

export const ProfileRow: React.FC<ProfileRowProps> = ({ leftText, rightText, Icon }) => {
  return (
    <div style={{ display: "flex", flexDirection: "row", gap: "0.5rem", alignItems: "center" }}>
      <Icon />
      <Typography.Text strong>{leftText}:</Typography.Text>
      <Typography>{rightText}</Typography>
    </div>
  );
};
