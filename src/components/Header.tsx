import React, {FunctionComponent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Sparkles, Paintbrush2, Circle, CircleDashed, CircleSlashed, CircleOff, CircleDot} from "lucide-react";

import { TitleBar } from '@react95/core';
import { Doc , Star } from '@react95/icons';



const Header: FunctionComponent = () => {

    const [dark, setDark] = useState(false);

    function switchTheme() {
        document.documentElement.classList.toggle("dark");
        setDark(!dark)
    }

    const navigate = useNavigate();

    return (
    <TitleBar active icon={<Doc variant="16x16_4" />} title="Lirikisa">
      <TitleBar.OptionsBox>

        <TitleBar.Option as="a" href="https://github.com/React95/React95">
          <Star variant="16x16_4" />
        </TitleBar.Option>

      </TitleBar.OptionsBox>
    </TitleBar>
    );
};

export default Header;
