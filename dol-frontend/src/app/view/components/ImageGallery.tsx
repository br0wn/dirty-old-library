import React from 'react';

interface ImageGalleryProps {
    images: string[];
}

function ImageGallery(props: ImageGalleryProps) {

    return (
        <div>
            {
                (props.images || []).map((image, index) => {
                    return (
                        <div key={`image-${index}`} className={"m-2"}>
                            <img src={image} alt="" width="100%"/>
                        </div>
                    );
                })
            }
        </div>
    )
}

export default ImageGallery;
