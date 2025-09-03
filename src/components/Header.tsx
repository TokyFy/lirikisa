import React, { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";

import { TitleBar } from "@react95/core";
import { Doc, Star, User7, Notepad1 } from "@react95/icons";

const Header: FunctionComponent = () => {
  const [dark, setDark] = useState(false);

  function switchTheme() {
    document.documentElement.classList.toggle("dark");
    setDark(!dark);
  }

  const navigate = useNavigate();

  const goHome = () => {
    navigate(`/`);
  };

  return (
    <TitleBar
      active
      icon={<Notepad1 variant="32x32_4" />}
      title="Lirikisa"
      className="cursor-pointer"
      onClick={() => goHome()}
    >
      {/* @ts-ignore */}
      <TitleBar.OptionsBox>
        <TitleBar.Option as="a" href="/">
          <User7 variant="32x32_4" />
        </TitleBar.Option>
      </TitleBar.OptionsBox>
    </TitleBar>
  );
};

export default Header;
