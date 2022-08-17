import React, { useState } from "react";
import { Popover } from "antd";

const CPopover = ({ content, children, onClick }) => {
  const [isOpenPopover, setIsOpenPopover] = useState(false);

  //   const hide = () => {
  //     setIsOpenPopover(false);
  //   };

  const handleVisibleChange = (newVisible) => {
    setIsOpenPopover(newVisible);
  };

  return (
    <Popover
      content={content}
      //   title="Title"
      trigger="click"
      placement="bottom"
      visible={isOpenPopover}
      onVisibleChange={handleVisibleChange}
    >
      {children}
    </Popover>
  );
};

export default CPopover;
