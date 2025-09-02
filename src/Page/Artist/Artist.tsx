import React, { FunctionComponent, useEffect } from "react";
import { IMAGE_PROXY_URL } from "../../constant";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { GetArtist } from "../../service";
import MusicCards from "../../components/MusicCards";
import ArtistSkeleton from "./ArtistSkeleton";
import {List , Fieldset} from "@react95/core";

const Artist: FunctionComponent = (props) => {
  const { id } = useParams();

  const { isLoading, isError, data, error, refetch } = useQuery(
    ["artist", id],
    ({}) => GetArtist(`${id}`),
    {
      staleTime: 5 * (60 * 1000),
      cacheTime: 2.5 * (60 * 1000),
    }
  );


  return (
    <>
      {isLoading ? (
        <ArtistSkeleton />
      ) : (
      <div>
        <Fieldset className={"p-2 my-4"} legend={data?.name}>
              <img
                className={"w-full h-auto"}
                src={`${IMAGE_PROXY_URL}${data?.picUrl}`}
                alt={"album cover"}
              />
        </Fieldset>

        <Fieldset className="p-2" legend="Popular songs ...">
          <List className={"py-2"}>
            {data?.hotSong!.map((song, index) => (
                <div
                    key={index}
                >
              <MusicCards
                image={song.AlbumArts}
                title={song.title}
                album={song.Album.name}
                artist={song.Artists[0].name}
                songId={song.id}
                ImageId={song.AlbumArtsID}
                ArtistId={song.Artists[0].id}
              />
                <List.Divider/>
              </div>
            ))}
          </List>
          </Fieldset>
        </div>
      )}
    </>
  );
};
export default Artist;
