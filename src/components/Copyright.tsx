import React, {FunctionComponent} from "react";

import {Fieldset} from "@react95/core";

interface OwnProps {
}

type Props = OwnProps;

const Copyright: FunctionComponent<Props> = (props) => {
    return (
        <Fieldset legend="What is this ??" className="p-2">
            <div className={"group"}>
                <p>
                    Hello (~-~) , <br/>
                    Yet another Lyrics finder App ...
                    <br/>
                    <br/>
                    This is my participation for Bolt.new{" "}
                    <span className="underline font-italic">
            Dream Feature Challenge
          </span>{" "}
                    , I love all the musics app today but I can't Download Lrc file to put
                    on my phone so I implement this <br/>
                    <br/>
                    Made with {"<3"} and{" "}
                    <a className="font-bold" target="_blank" href="https://bolt.new/">
                        Bolt.new
                    </a>{" "}
                    By{" "}
                    <a target="_blank" className="font-bold" href="https://toky.vercel.app">
                        Toky
                    </a>{" "}
                    and{" "}
                    <a target="_blank" className="font-bold" href="https://ony.world">
                        Ony
                    </a>
                    <br/>
                </p>
            </div>
        </Fieldset>
    );
};

export default Copyright;
