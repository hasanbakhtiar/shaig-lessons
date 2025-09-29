import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { addItem } from '../utils/postDataFunc';

const AddProduct = () => {

  const [category, setCategory] = useState([]);
  const [selectCategory, setSelectCategory] = useState('');



  const [textAz, setTextAz] = useState('');
  const [textEn, setTextEn] = useState('');
  const [textRu, setTextRu] = useState('');

  const formSubmited = (e) => {
    e.preventDefault();
    const formData = new FormData();
    
    images.forEach((img) => {
      formData.append('images', img.file);
    });

    coverImage.forEach((img) => {
      formData.append('thumbnail', img.file);
    });

    formData.append('title_az', textAz);
    formData.append('title_en', textEn);
    formData.append('color', textRu);
      addItem(`http://localhost:3000/api/v1/ad/product`,{
        headers:{
        "fynode-access":"d832767809bb1a62ceb8168aa4c18072",
        "x-auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZnVsbG5hbWUiOiJIYXNhbiBCYWtodGlhciIsImVtYWlsIjoiaGFzYW5Ad2VibHVuYS5vcmciLCJwaG9uZSI6Iis5OTQgNzAgMzQ3IDk3IDI3Iiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzU5MTU1MjQ5fQ.Wox_pISJpde8ERqrRJWEQhTUsYltv7cjPg9zc37fySA"
        }},formData);
  
  };

  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const imageUrls = selectedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages(imageUrls);
  };

  const [coverImage, setCoverImage] = useState([]);

  const handleCoverImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const imageUrls = selectedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setCoverImage(imageUrls);
  };

  const handleRemoveCoverImage = (indexToRemove) => {
    setCoverImage((prevImages) =>
      prevImages.filter((_, idx) => idx !== indexToRemove)
    );
  };

  const handleRemoveImage = (indexToRemove) => {
    setImages((prevImages) =>
      prevImages.filter((_, idx) => idx !== indexToRemove)
    );
  };

  return (
    <section className="formPage">
      <form onSubmit={formSubmited}>
        <div className="head py-2">
          <h3 className="text-center alert alert-info text-success">
            Model əlavə edin
          </h3>
        </div>

        <>
          <div className="inputs-main-box py-2">
            <div className="text-center w-100">
              <div className="image-previews">
                {coverImage.length > 0 ? (
                  coverImage.map((img, index) => (
                    <div
                      key={index}
                      className="position-relative"
                      style={{ display: 'inline-block' }}
                    >
                      <img
                        width={100}
                        height={100}
                        src={img.preview}
                        alt={`preview-${index}`}
                        className="rounded"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveCoverImage(index)}
                        className="btn btn-danger btn-sm position-absolute top-0 end-0"
                        style={{ transform: 'translate(30%, -30%)' }}
                      >
                        &times;
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="py-5 text-light">Şəkil Yoxdur</div>
                )}
              </div>

              <div className="input-item">
                <span className="input-type">
                  Üzlük Şəkili <i className="fa-solid fa-star-of-life"></i>
                </span>

                <div className="input-container">
                  <label
                    className="form-control text-input"
                    htmlFor="imageInputCover"
                  >
                    <div className="input-file-box">
                      <div className="text-box">
                        <p className="img-format">
                          Üzlük üçün şəkil əlavə edin
                        </p>
                        <div className="click-here">
                          <span>Şəkil yükləmək üçün kliklə</span>
                        </div>
                      </div>
                    </div>
                  </label>

                  <input
                    multiple
                    type="file"
                    accept="image/*"
                    className="form-control text-input"
                    id="imageInputCover"
                    hidden
                    onChange={handleCoverImageChange}
                  />
                </div>
              </div>
            </div>

            <div className="text-center w-100">
              <div className="image-previews">
                {images.length > 0 ? (
                  images.map((img, index) => (
                    <div
                      key={index}
                      className="position-relative"
                      style={{ display: 'inline-block' }}
                    >
                      <img
                        width={100}
                        height={100}
                        src={img.preview}
                        alt={`preview-${index}`}
                        className="rounded"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="btn btn-danger btn-sm position-absolute top-0 end-0"
                        style={{ transform: 'translate(30%, -30%)' }}
                      >
                        &times;
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="py-5 text-light">Şəkil Yoxdur</div>
                )}
              </div>

              <div className="input-item">
                <span className="input-type">
                  Şəkillər <i className="fa-solid fa-star-of-life"></i>
                </span>

                <div className="input-container">
                  <label
                    className="form-control text-input"
                    htmlFor="imageInput"
                  >
                    <div className="input-file-box">
                      <div className="text-box">
                        <p className="img-format">Şəkil əlavə edin</p>
                        <div className="click-here">
                          <span>Şəkil yükləmək üçün kliklə</span>
                        </div>
                      </div>
                    </div>
                  </label>

                  <input
                    multiple
                    type="file"
                    accept="image/*"
                    className="form-control text-input"
                    id="imageInput"
                    hidden
                    onChange={handleImageChange}
                  />
                </div>
              </div>
            </div>

            <div className="input-item">
              <span className="input-type">
                Kateqoriya<i className="fa-solid fa-star-of-life"></i>
              </span>

              <div className="input-container">
                <select
                  className="form-select text-input"
                  onChange={(e) => {
                    setSelectCategory(e.target.value);
                  }}
                >
                  <option value="">Kateqoriya seçin</option>
                  {category.map((item) => (
                    <option value={item._id}>{item.titleAz}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="input-item">
              <span className="input-type">
                Mətn Az<i className="fa-solid fa-star-of-life"></i>
              </span>
              <div className="input-container">
                <textarea
                  className="text-input"
                  cols="74"
                  rows="3"
                  onChange={(e) => setTextAz(e.target.value)}
                ></textarea>
              </div>
            </div>

            <div className="input-item">
              <span className="input-type">
                Mətn En<i className="fa-solid fa-star-of-life"></i>
              </span>
              <div className="input-container">
                <textarea
                  className="text-input"
                  cols="74"
                  rows="3"
                  onChange={(e) => setTextEn(e.target.value)}
                ></textarea>
              </div>
            </div>

            <div className="input-item">
              <span className="input-type">
                Mətn Ru<i className="fa-solid fa-star-of-life"></i>
              </span>
              <div className="input-container">
                <textarea
                  className="text-input"
                  cols="74"
                  rows="3"
                  onChange={(e) => setTextRu(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>

          <div className="btn-box">
            <button type="submit" className="add-btn">
              Əlavə et
            </button>
          </div>
        </>
      </form>
    </section>
  );
};

export default AddProduct;
