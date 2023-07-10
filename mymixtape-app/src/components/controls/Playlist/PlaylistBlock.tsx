"use client";
import { Image } from "@/types/models";
import BlockLayout from "../../layouts/BlockLayout";
import BlockImage from "./BlockImage";
import BlockName from "./BlockName";

export default function PlaylistBlock(props: PlaylistBlockProps) {
  const { id, name, images, active, selectPlaylist, isSkeleton } = props;

  const image = images[0];

  return (
    <BlockLayout id={id} active={active} selectPlaylist={selectPlaylist}>
      <BlockImage image={image.url} />
      <BlockName name={name} />
    </BlockLayout>
  );
}

interface PlaylistBlockProps {
  id: string;
  name: string;
  images: Image[];
  active: boolean;
  selectPlaylist: (e: any, id: string) => void;
  isSkeleton?: boolean;
}
