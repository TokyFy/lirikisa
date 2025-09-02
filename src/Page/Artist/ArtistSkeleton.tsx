import React, { FunctionComponent } from "react";
import { MusicCardSkeleton } from "../../components/MusicCards";
import {Mshtml32538} from "@react95/icons";

const ArtistSkeleton: FunctionComponent = () => {
  return (
    <>
        <div className="flex flex-col justify-center items-center gap-4 p-4"> 
            <Mshtml32538 variant="32x32_4"/>
             <p> {"Get Artist Data ..."} </p>
        </div>
    </>
  );
};

export default ArtistSkeleton;
