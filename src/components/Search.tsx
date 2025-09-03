import React, {FunctionComponent, useEffect, useState} from "react";

import {Input, Button} from "@react95/core";
import {Wab321012} from "@react95/icons";

interface OwnProps {
    onClick: (str: string) => void;
    InputValue?: string;
    placeHolder?: string;
}

type Props = OwnProps;

const Search: FunctionComponent<Props> = ({onClick, InputValue, placeHolder,}) => {
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
                className="flex gap-2"
                onClick={() => onClick(value)}
            >
                Enter
                <Wab321012 variant="16x16_4"/>
            </Button>
        </div>
    );
};

export default Search;
