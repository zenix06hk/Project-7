import React from "react";

const UploadFile = ({ data, setFieldValue, errors }) => {
  return (
    <div>
      <input
        type="file"
        name="image"
        accept="image/png, .svg"
        onChange={(e) => {
          if (e.currentTarget.files) {
            setFieldValue("image", e.currentTarget.files[0]);
          }
        }}
      />
      {errors.image && (
        <>
          <br />
          <span id="error">{errors.image}</span>
          <br />
        </>
      )}
    </div>
  );
};

export default UploadFile;
