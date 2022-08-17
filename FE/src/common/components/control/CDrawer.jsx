import React, { useState } from "react";
import { Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";

const CDrawer = ({ children }) => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const showDrawer = () => {
    setIsOpenDrawer(true);
  };

  const onClose = () => {
    setIsOpenDrawer(false);
  };
  return (
    <>
      <MenuOutlined onClick={showDrawer} />
      <Drawer
        title="Basic Drawer"
        placement="right"
        onClose={onClose}
        visible={isOpenDrawer}
      >
        {children}
      </Drawer>
    </>
  );
};

export default CDrawer;
