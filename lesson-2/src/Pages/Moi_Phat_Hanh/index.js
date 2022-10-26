import { Button, Container, Row } from "react-bootstrap";
import styles from "./style.module.css";
import React from "react";
import MusicItem from "../../Components/MusicItem/Index";
const data = [
  {
    thumbnail: require("../../Assets/co_don_tren_sofa.jpg"),
    name: "Cô đơn trên sofa",
    artists: ["Hồ Ngọc Hà"],
    releasedTime: 1,
    isVip: false,
  },
  {
    thumbnail: require("../../Assets/hoi_duyen.jpg"),
    name: "Hối Duyên",
    artists: ["Masew", "Khoi Vu", "Great"],
    releasedTime: 4,
    isVip: false,
  },
  {
    thumbnail: require("../../Assets/ill.webp"),
    name: "ill",
    artists: ["Alexander 23", "Kenny Beats"],
    releasedTime: 6,
    isVip: true,
  },
  {
    thumbnail: require("../../Assets/906090.jpg"),
    name: "906090",
    artists: ["Tóc Tiên", "Mew Amazing"],
    releasedTime: 1,
    isVip: false,
  },
  {
    thumbnail: require("../../Assets/nguoi_co_con_thuong.jpg"),
    name: "Người Có Còn Thương",
    artists: ["Minh Vương M4U", "Thương Võ", "ACV"],
    releasedTime: 5,
    isVip: false,
  },
];
export default function MoiPhatHanh() {
  return (
    <Container className={styles.container}>
      <Container className={styles.titleContainer}>Mới phát hành</Container>
      <Container className={styles.buttonContainer}>
        <Button className={styles.headerBtn}>Bài hát</Button>
        <Button className={styles.headerBtn}>Album</Button>
        <Button className={styles.allBtn}>
          Tất cả <i className="bi bi-chevron-right"></i>
        </Button>
      </Container>
      <Container>
        <Row>
          {/* ITEMS GO HERE */}
          {data.map((item, index) => {
            return (
              <MusicItem
                 
              />
            );
          })}
        </Row>
      </Container>
    </Container>
  );
}