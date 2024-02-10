export const uploadCloudinary = async (file: any) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      `${process.env.UPLOAD_PRESET}`
    );

    const response = await fetch(`${process.env.CLOUDINARY_API}`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    return { url: data?.secure_url };
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw new Error("Error uploading to Cloudinary");
  }
};
