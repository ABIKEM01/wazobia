"use client";
import React, { useState, useEffect } from "react";
// import { PlusCircleIcon } from '@heroicons/react/solid';
import FileUpload from "./inputs/FileUpload";
import TextEditor from "./inputs/textAreaInput";
import TitleEditor from "./inputs/TitleEditor";
import InputField from "./inputs/InputField";
import * as Yup from "yup";
import { Formik, ErrorMessage } from "formik";
import Head from "next/head";
import axios from 'axios'

const Home = () => {
  const [images, setImages] = useState<any>([]);
  const [videos, setVideos] = useState<any>([]);
  const [description, setDescription] = useState<any>("");
  const [title, setTitle] = useState<any>("");


  const uploadFile = async (file: any) => {
    const formData = new FormData()
    const cloud_name = 'dpkc6mzti'
    const upload_preset = 'cityshoppa'
    // console.log(process.env.CLOUDINARY_UPLOAD_PRESET, "THE UPLOAD PRESET ")
    formData.append("file", file)
    formData.append("upload_preset", `${upload_preset}`)
    formData.append("cloud_name", `${cloud_name}`)
    const imageResult = await axios.post("https://api.cloudinary.com/v1_1/dpkc6mzti/image/upload", formData)
    return imageResult.data.secure_url
}

  return (
    <>
      <Head>
        <title>Text Editor - Wazobia</title>
        <meta name="description" content="City Shoppa" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full">
        <div className="flex flex-col md:flex-row md:justify-center md:items-center mb-4">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-1">Add Post</h2>

            <Formik
              initialValues={{
                title: title,
                description: description,
                image: [],
              }}
              validationSchema={Yup.object({
                title: Yup.string().required(
                  "Product or Service name is required"
                ),
                email: Yup.string().required("Email is required"),
                phone: Yup.string().required("Phone number is requred"),
              })}
              onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true);

                let postImage;
                if (images.length > 0) {
                  const result = await uploadFile(images[0].data_url)
                  postImage = result
                }

                const requestDetails = {
                  ...values,
                  description: description,
                  // image: postImage,
                };

                try {
                  // const res = await postRequest(requestDetails)
                  // if (res.post) {
                  //   showSuccess("Request Created Successfully.")
                  //   router.push("/")
                  // setSubmitting(false)
                  // }
                } catch (err) {
                  // showError("Something Went Wrong. Please Try Again")
                  setSubmitting(false);
                }
              }}
            >
              {({
                values,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <form onSubmit={handleSubmit}>
              
                  <div className="mb-1 mt-1">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-left text-gray-700 py-3"
                    >
                      {/* Description */}
                    </label>
                    <TextEditor text={description} setText={setDescription} />
                  </div>

                  <div className="mb-1 mt-12">
                    <label
                      htmlFor="image"
                      className="block text-sm font-medium text-left text-gray-700 md:pt-0 pt-16 md:py-3"
                    >
                    </label>

                    <FileUpload
                      setImages={setImages}
                      images={images}
                      multiple={true}
                      label={"Upload Image"}
                    />
                  </div>
                  <div className="flex justify-start">
                    <button
                      // onClick={submitHandler}
                      // disabled={false}
                      disabled={isSubmitting}
                      type="submit"
                      className="flex my-10 cursor-pointer items-center justify-center bg-green-600 hover:bg-primary text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                    >
                      {/* <PlusCircleIcon className="h-5 w-5 mr-2" /> */}
                      {isSubmitting ? "Please Wait..." : "Embeded"}
                    </button>
                    <button
                      // onClick={submitHandler}
                      // disabled={false}
                      disabled={isSubmitting}
                      type="submit"
                      className="ml-4 flex my-10 cursor-pointer items-center justify-center bg-gray-100 hover:bg-primary text-black font-semibold py-2 px-4 border border-black rounded-lg transition duration-200"
                    >
                      {/* <PlusCircleIcon className="h-5 w-5 mr-2" /> */}
                      {isSubmitting ? "Please Wait..." : "Cancel"}
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
