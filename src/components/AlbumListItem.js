import Button from "./Button";
import ExpandablePanel from "./ExpandablePanel";
import { GoTrashcan } from "react-icons/go";
import { useRemoveAlbumMutation } from "../store";
import PhotoList from "./PhotoList";

function AlbumListItem({ album }) {
    const handleRemoveAlbumClick = () => {
        removeAlbum(album);
    };
    const [removeAlbum, results] = useRemoveAlbumMutation();
    const header = (
        <>
            <Button
                loading={results.isLoading}
                onClick={handleRemoveAlbumClick}
                className="mr-2">
                <GoTrashcan />
            </Button>
            {album.title}
        </>
    );
    return (
        <ExpandablePanel key={album.id} header={header}>
            <PhotoList album={album} />
        </ExpandablePanel>
    );
}

export default AlbumListItem;