import React, {FunctionComponent, useEffect, useState} from "react";
import {Sparkles, CornerRightDown, Paintbrush, CornerDownRight, CornerDownLeft} from "lucide-react"

import { Input , Button } from "@react95/core";

interface OwnProps {
    onClick: (str: string) => void;
    InputValue?: string;
    placeHolder?: string;
}

type Props = OwnProps;

const Search: FunctionComponent<Props> = ({ onClick, InputValue, placeHolder,}) => {
    const [value, setValue] = useState("");

    useEffect(() => {
        setValue(InputValue || "");
    }, []);

    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (
        event
    ) => {
        if (event.key === "Enter") {
            onClick(value);
        }
    };

    return (
        <div className={"group flex h-8 items-center "}>
            <Input
                className={"grow h-full"}
                type="text"
                name="search"
                spellCheck={false}
                autoComplete={"off"}
                placeholder={placeHolder || "Type your best song here..."}
                onChange={(el) => setValue(el.target.value)}
                onKeyDown={handleKeyDown}
                value={value}
            ></Input>
            <Button
                onClick={() => onClick(value)}
            >
                Enter
            </Button>
        </div>
    );
};

export default Search;
