import React, {FunctionComponent, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {IMAGE_PROXY_URL} from "../constant";
import {useQuery} from "react-query";
import {GetPictures} from "../service";
import {ArrowUp, ArrowUpRight} from "lucide-react";

import {List} from "@react95/core";

interface OwnProps {
    image?: string;
    title: string;
    album: string;
    artist: string;
    songId: string;
    ImageId?: string;
    ArtistId: string;
}

type Props = OwnProps;

const MusicCards: FunctionComponent<Props> = (
    {image, title, artist, album, songId, ImageId, ArtistId}) => {
    const navigate = useNavigate();

    const {isLoading, isError, data, error} = useQuery<{ url: string }>(
        ["Pictures", `${songId || ImageId}`],
        ({}) => {
            if (image) return new Promise((resolve, reject) => {
                resolve({
                    url: image
                })
            })

            return GetPictures(`${ImageId}`)
        },
        {
            staleTime: 5 * (60 * 1000),
            cacheTime: 2.5 * (60 * 1000),
        }
    );


    const cardClickHandler = () => {
        navigate(`/lyrics/${songId}`, {
            state: {
                title: title,
                artist: artist,
                image: data?.url,
                album: album,
                ArtistId: ArtistId
            },
        });
    };

    const ArtistNameClickHandler = () => {
        navigate(`/artist/${ArtistId}`);
    };

    return (
        <>
        <List.Item
            className="!px-2"
            onClick={() => cardClickHandler()}>
            <div className={"flex text-md grow justify-between items-center"}>
                <p
                    className={"first-letter:uppercase"}>
                    <span
                        className="group-hover:underline cursor-cell"
                        onClick={(event) => {
                            event.stopPropagation();
                            ArtistNameClickHandler();
                        }}
                    >
                        {artist}
                    </span>
                    <span className="inline-block">{" - "}</span>{title}
                </p>
                <p>
                    <strong>{album}</strong>
                </p>
            </div>
        </List.Item>
        </>
    );
};

export const MusicCardSkeleton: FunctionComponent = () => {
    return (
        <div className={"group flex p-1 items-center cursor-pointer gap-4  my-1 border rounded hover:bg-neutral-50"}>
            <div
                className={"w-6 aspect-square overflow-hidden bg-neutral-300 duration-300 rounded-sm grayscale group-hover:grayscale-0"}>

            </div>
            <p className={"flex text-sm grow justify-between items-center"}>
                <span
                    className={"first-letter:uppercase font-bold bg-neutral-200 w-32 h-3 group-hover:text-purple-400 duration-500 dark:text-gray-300"}></span>
                <span
                    className={"text-neutral-400 text-[12px] dark:text-gray-500 bg-neutral-200 w-32 h-3"}
                >
                  <strong className="group-hover:underline first-letter:uppercase"></strong>
                </span>
            </p>
        </div>
    );
};

export default MusicCards;
