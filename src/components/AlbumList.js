import { useFetchAlbumsQuery, useAddAlbumMutation } from "../store";
import Skeleton from './Skeleton';
import Button from './Button';
import AlbumListItem from "./AlbumListItem";

function AlbumList({user}) {
    const { data, error, isFetching } = useFetchAlbumsQuery(user);
    const [addAlbum, results] = useAddAlbumMutation();
    const handleAddAlbumClick = () => {
        addAlbum(user);
    };
    let content;
    if (isFetching) {
        content = <Skeleton className="h-10 w-full" times={3} />;
    } else if (error) {
        content = <div>Error loading albums...</div>;
    } else {
        content = data.map((album) => {
            return <AlbumListItem album={album} key={album.id} />;
        });
    }
    return (
        <div>
            <div className="m-2 flex flex-row items-center justify-between">
                <h3 className="text-lg font-bold">Albums for {user.name}:</h3>
                <Button loading={results.isLoading} onClick={handleAddAlbumClick}>+ Add Album</Button>
            </div>
            <div>{content}</div>
        </div>
    );
}

export default AlbumList;