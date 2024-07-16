import Skeleton from "./Skeleton";
import Button from "./Button";
import { useAddPhotoMutation, useFetchPhotosQuery } from "../store/apis/photosApi";
import PhotoListItem from "./PhotoListItem";

function PhotoList({ album }) {
    const { data, error, isFetching } = useFetchPhotosQuery(album);
    const [addPhoto, results] = useAddPhotoMutation();
    const handleAddPhotoClick = () => {
        addPhoto(album);
    };
    let content;
    if (isFetching) {
        content = <Skeleton className="h-8 w-8" times={4} />;
    }
    else if (error) {
        content = <div>Error loading photos...</div>
    }
    else {
        content = data.map((photo) => {
            return <PhotoListItem photo={photo} key={photo.id} />;
        });
    }
    return (
        <div>
            <div className="m-2 flex flex-row items-center justify-between">
                <h3 className="text-lg font-bold">Photos in {album.title}</h3>
                <Button loading={results.isLoading} onClick={handleAddPhotoClick}>+ Add Photo</Button>
            </div>
            <div className="mx-8 flex flex-row flex-wrap justify-center">
                {content}
            </div>
        </div>
    );
};

export default PhotoList;