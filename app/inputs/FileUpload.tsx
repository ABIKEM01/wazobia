"use client"
import React from "react";
import ImageUploading from "react-images-uploading";

interface FileUploadProps {
  setImages: any;
  images: any;
  multiple: boolean;
  label: string;
}

function FileUpload({ setImages, images, multiple, label }: FileUploadProps) {
  const maxNumber = 69;

  const onChange = (imageList: any, addUpdateIndex: any) => {
    setImages(imageList);
  };

  return (
    <div>
      <ImageUploading
        multiple={multiple}
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url">
        {({
          imageList,
          onImageUpload,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          <div className="upload__image-wrapper">
            <button
            type="button"
              className="my-5 text-black mr-5 border-dashed border-2 border-orange "
              style={{
                // backgroundColor: isDragging ? "green" : "#000",
                borderRadius: "10px",
                padding: "50px",
                fontWeight: "bold",
                textAlign: "center",
                width: "100%",
                height: "150px",
              }}
              onClick={onImageUpload}
              {...dragProps}>
              {label}
            </button>

            {imageList?.map((image, index) => (
              <div className="flex justify-between items-center" key={index}>
                <img
                  className="w-[100px] h-[100px] my-1 object-contain"
                  src={image["data_url"]}
                  alt=""
                />
                <div
                  style={{
                    display: "flex",
                    marginTop: "20px",
                  }}
                  className="image-item__btn-wrapper">
                  <button
                    style={{
                      backdropFilter: "none",
                      backgroundColor: "green",
                      borderRadius: "5px",
                      padding: "5px",
                      color: "white",
                      marginRight: "10px",
                      marginBottom: "10px",
                    }}
                    onClick={() => onImageUpdate(index)}>
                    Update
                  </button>
                  <button
                    style={{
                      backdropFilter: "none",
                      backgroundColor: "red",
                      borderRadius: "5px",
                      padding: "5px",
                      color: "white",
                      marginRight: "10px",
                      marginBottom: "10px",
                    }}
                    onClick={() => onImageRemove(index)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  );
}

export default FileUpload;

const styles = {
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#f0f0f0",
  },
};
