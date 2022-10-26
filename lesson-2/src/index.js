import React from "react";
import ReactDOM from "react-dom/client";
import Chill from "./Pages/Chill";
import MoiPhatHanh from "./Pages/Moi_Phat_Hanh";
import Carousel from 'react-bootstrap/Carousel';
import CarouselItem from "./Components/CarouselItem";
import "./style.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
const ListImage = [
  'https://picsum.photos/seed/picsum/800/400',
  'https://picsum.photos/seed/picsum/800/400',
  'https://picsum.photos/seed/picsum/800/400',
  'https://picsum.photos/seed/picsum/800/400',
  'https://picsum.photos/seed/picsum/800/400',
  'https://picsum.photos/seed/picsum/800/400',
  'https://picsum.photos/seed/picsum/800/400',
  'https://picsum.photos/seed/picsum/800/400',
  'https://picsum.photos/seed/picsum/800/400',
]

const data = [
  {
    thumbnail: require("./Assets/co_don_tren_sofa.jpg"),
    name: "Cô đơn trên sofa",
    artists: ["Hồ Ngọc Hà"],
    releasedTime: 1,
    isVip: false,
  },
  {
    thumbnail: require("./Assets/hoi_duyen.jpg"),
    name: "Hối Duyên",
    artists: ["Masew", "Khoi Vu", "Great"],
    releasedTime: 4,
    isVip: false,
  },
  {
    thumbnail: require("./Assets/ill.webp"),
    name: "ill",
    artists: ["Alexander 23", "Kenny Beats"],
    releasedTime: 6,
    isVip: true,
  },
];

root.render(
  <React.StrictMode>
    {/* <MoiPhatHanh />
    <Chill /> */}
    <Carousel>
      {ListImage.map((value, index) =>
        <Carousel.Item key={index}>
          <img
            className="d-block w-100"
            src={value}
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>)}
    </Carousel>
  </React.StrictMode>
);
