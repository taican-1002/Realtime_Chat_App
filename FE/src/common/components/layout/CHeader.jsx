import React, { useEffect, useRef, useState } from "react";
import { Layout, Menu } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/img/logo.png";
import CDrawer from "@/common/components/control/CDrawer";
import CPopover from "@/common/components/control/CPopover";
import Logout from "./Logout";

const headerItems = [
  {
    label: "home",
    key: "home",
  },
  {
    label: "chat",
    key: "chat",
  },
  {
    label: "contact",
    key: "contact",
  },
];
const { Header } = Layout;
const CHeader = () => {
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentUsername, setCurrentUsername] = useState(undefined);
  const navigate = useNavigate();
  const headerRef = useRef(null);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.onscroll = () => {
      headerRef.current.offsetTop > 10
        ? headerRef.current.classList.add("active")
        : headerRef.current.classList.remove("active");
    };
    window.onresize = () => {
      setInnerWidth(window.innerWidth);
    };
    const handleSetCurrentUser = async () => {
      const data = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );
      setCurrentUserImage(data.avatarImage);
      setCurrentUsername(data.username);
    };
    handleSetCurrentUser();
  }, []);
  const handleGoToPage = (event) => {
    navigate("/" + event.key);
  };

  return (
    <>
      {currentUserImage && (
        <Header
          className="sticky top-0 z-10 flex items-center justify-between w-full bg-transparent header"
          ref={headerRef}
        >
          <div className="flex items-center logo">
            <img src={logo} alt="logo" className="w-10" />
            <div className="ml-4 text-2xl font-medium">ChatBOT</div>
          </div>
          <div className="flex items-center">
            {innerWidth > 768 ? (
              <Menu
                className="text-xl font-medium capitalize bg-transparent border-0 xl:w-72 md:w-72 sm:w-12"
                mode="horizontal"
                defaultSelectedKeys={["chat"]}
                items={headerItems}
                onClick={(event) => handleGoToPage(event)}
              />
            ) : (
              <CDrawer>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
              </CDrawer>
            )}

            <SearchOutlined className="flex p-4 ml-4 mr-6 text-xl cursor-pointer hover:text-blue-500" />

            <CPopover
              content={
                <>
                  <p className="text-center">{currentUsername}</p>
                  <Logout />
                </>
              }
            >
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
                className="w-8 mr-12 cursor-pointer"
              />
            </CPopover>
          </div>
        </Header>
      )}
    </>
  );
};

export default CHeader;
