import React, {FunctionComponent, useEffect, useState} from "react";
import MusicCards from "../../components/MusicCards";
import {MusicCardSkeleton} from "../../components/MusicCards";
import Search from "../../components/Search";

import {useSearchParams} from "react-router-dom";
import {searchSongs} from "../../service";
import Error from "../../components/Error";
import {useQuery} from "react-query";

import {List} from "@react95/core";
import {Mshtml32538} from "@react95/icons";
import { useClippy, ClippyProvider } from '@react95/clippy';


interface OwnProps {
}

type Props = OwnProps;

const Result: FunctionComponent<Props> = (props) => {


    const { clippy } = useClippy();

    useEffect(() => {
        if (clippy) {
            clippy.play('Congratulate');
            clippy.speak('Hohoo You have a great taste of musics', true);
        }
    }, [clippy]); 


    const [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = useState(searchParams.get("q"));

    const {isLoading, isError, data, error, refetch} = useQuery(
        ["search", query],
        ({}) => searchSongs(`${query}`),
        {
            staleTime: 5 * (60 * 1000),
            cacheTime: 2.5 * (60 * 1000),
        }
    );

    const clickHandler = async (str: string) => {
        if (!(str.trim() === "")) {
            setSearchParams({q: str});
            setQuery(str);
        }
    };

    return (
        <>
            <div className="my-8">
                <Search onClick={clickHandler}
                        InputValue={query || ""}
                        placeHolder={"e.g.: Clairo"}/>
            </div>

            <List>
                {isLoading ? (
                    <div className="flex flex-col justify-center items-center gap-4 p-4"> 
                        <Mshtml32538 variant="32x32_4"/>
                        <p> {"Searching ..."} </p>
                    </div>
                ) : isError ? (
                    <Error/>
                ) : (
                    data!.map((song, index) => (
                        <div
                            key={index}
                        >
                        <MusicCards
                            image={`${song.AlbumArts}`}
                            title={song.title}
                            album={song.Album.name}
                            artist={song.Artists[0].name}
                            songId={song.id}
                            ArtistId={song.Artists[0].id}
                        />
                        <List.Divider/>
                        </div>
                    ))
                )}
            </List>
        </>
    );
};
export default Result;
