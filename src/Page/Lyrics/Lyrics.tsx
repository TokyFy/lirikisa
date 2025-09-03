import React, {FunctionComponent , useEffect, useMemo } from "react";
import {useLocation, useParams} from "react-router-dom";
import {GetLyrics} from "../../service";
import {useQuery} from "react-query";
import LyricsSkeleton from "./LyricsSkeleton";
import Btn from "../../components/Btn";
import {IMAGE_PROXY_URL} from "../../constant";
import {Download, Printer, DownloadCloud, ArrowDownFromLine, ArrowDown} from "lucide-react"
import MusicCards from "../../components/MusicCards";
import {useNavigate} from "react-router-dom";

import {Fieldset , TextArea , List , Button} from "@react95/core";
import {Fontext2 , User} from "@react95/icons";
import { useClippy, ClippyProvider } from '@react95/clippy';
import {Lrc} from "lrc-kit";

const Lyrics: FunctionComponent = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const { clippy } = useClippy();

    useEffect(() => {
        if (clippy) {
            clippy.play('Acknowledge');
            clippy.speak('Yoyo , now you can donwload it TT', false);
        }
    }, [clippy]); 


    const {title, artist, image, album, ArtistId} = useLocation().state;

    const {
        isLoading,
        isError,
        data: LyricsData,
        error,
    } = useQuery(["Lyrics", id], ({}) => GetLyrics(`${id}`), {
        staleTime: 5 * (60 * 1000),
        cacheTime: 2.5 * (60 * 1000),
    });

    const lyricsText = useMemo(() => {
      if (!LyricsData) return "";
      const lrcData = Lrc.parse(LyricsData.lyric);

      return lrcData.lyrics.map(line => line.content).join('\n');
    }, [LyricsData]);

    

    function downloadTxtFile(Lrc: string, title: string, Artist: string) {
        const blob = new Blob([Lrc], {type: "text/plain"});
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${title} - ${Artist}.lrc`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    const ArtistNameClickHandler = () => {
        navigate(`/artist/${ArtistId}`);
    };


    const lyrics = LyricsData?.lyric
        .split("\n")
        .filter((el) => !(el.includes("[00:00.00") || el.includes("[00:01.00")))
        .map((el) => {
            return [el.match(/\[\d{2,3}:\d{2,3}\.\d{2,3}]/) , el.replace(/\[\d{2,3}:\d{2,3}\.\d{2,3}]/, "")]
        });

    return (
        <div>
            <div className="py-4">
                <List>
                    <MusicCards image={image} title={title} album={album} artist={artist} songId={String(id)} ArtistId={ArtistId}/>
                </List>

            </div>
            {isLoading ? (
                <LyricsSkeleton/>
            ) : (
                <>
                    <div className="flex gap-2 flex-row-reverse py-4">
                        <Button className="flex gap-2" onClick={() => ArtistNameClickHandler()}> 
                            <p>Go to Artist</p>
                            <User variant="16x16_4"/>
                        </Button>
                        <Button className="flex gap-2" onClick={() => downloadTxtFile(`${LyricsData?.lyric}`, title, artist)}> 
                            <p>Download lrc file</p>
                            <Fontext2 variant="16x16_4"/>
                        </Button>
                    </div>
                    <Fieldset legend="Lyrics ... " className="p-2" >
                        <TextArea readOnly fontFamily="monospace" whiteSpace="pre-line" overflow="auto" rows={32} w="100%" value={lyricsText} />
                    </Fieldset>
                </>
            )}
        </div>
    );
};

export default Lyrics;
