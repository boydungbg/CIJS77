import { useState } from "react";
import { Badge, Col, Image, Row } from "react-bootstrap";
import styles from "./style.module.css";
import PropTypes from "prop-types";

/*
Data template:
    thumbnail: require("../../Assets/thumbnail_placehlder.jpg"),
    name: "Bai nay khong de di dien",
    artists: ["Anh Tu Atus"],
    releasedTime: 2,
    isVip: false,
*/

export default function MusicItem(props) {
  const [visibility, setVisibility] = useState("hidden");
  const [opacity, setOpacity] = useState(1);
  return (
    <Col
      xxl={4}
      className={styles["product-item-container"]}
      onMouseEnter={() => {
        setVisibility("unset");
        setOpacity(0.4);
      }}
      onMouseLeave={() => {
        setVisibility("hidden");
        setOpacity(1);
      }}
    >
      <Row>
        <Col xxl={3} className={styles.thumbContainer}>
          <Image
            src={props.thumbnail}
            className={styles.thumbnail}
            style={{ opacity: opacity }}
          />
          <div
            className={styles.playBtnContainer}
            style={{ visibility: visibility }}
          >
            <i className="bi bi-play-fill"></i>
          </div>
        </Col>
        <Col xxl={9} className={styles.infoContainer}>
          <div className={styles.nameText}>
            {props.name}{" "}
            <Badge
              bg="warning"
              text="dark"
              className={props.isVip ? "" : styles.vipBadgeHide}
            >
              VIP
            </Badge>{" "}
          </div>
          <div className={styles.artistsText}>{props.artists}</div>
          <div className={styles.releasedTimeText}>
            {props.releasedTime} ngày trước
          </div>
        </Col>
      </Row>
    </Col>
  );
}

MusicItem.propTypes = {
  name: PropTypes.string,
}