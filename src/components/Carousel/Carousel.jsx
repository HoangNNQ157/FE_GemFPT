import React from "react";
import { Carousel } from "antd";

const CarouselImg = ({ listImg }) => {
    return (
        <Carousel autoplay dots={false}>
            {listImg.length
                ? listImg.map((img, index) => (
                      <img
                          key={index}
                          src={img.urls}
                          alt="product"
                          style={{
                              width: "100px",
                              height: "100px",
                              objectFit: "cover",
                          }}
                      />
                  ))
                : null}
        </Carousel>
    );
};

export default CarouselImg;
