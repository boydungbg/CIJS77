import { useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import PropTypes from "prop-types";
import styles from "./style.module.css";

/*
Data template:
    image: require("../../Assets/thumbnail_placehlder.jpg"),
    name: "Today's V-Pop Hits",
    description: "KARIK, Only C và 30 bản ...",
*/

export default function PlaylistItem({ name, description, image }) {
  const [visibility, setVisibility] = useState("hidden");
  const [scale, setScale] = useState("1");

  return (
    <div className={styles.item}>
      <div
        className={styles.imgContainer}
        onMouseEnter={() => {
          setVisibility("unset");
          setScale("1.12");
        }}
        onMouseLeave={() => {
          setVisibility("hidden");
          setScale("1");
        }}
      >
        <img
          src={image}
          className={styles.thumbnail}
          alt="Playlist"
          style={{ scale: scale }}
        />
        <div className={styles.btnOverlay} style={{ visibility: visibility }}>
          <OverlayTrigger
            placement="top"
            delay={{ show: 100, hide: 100 }}
            overlay={<Tooltip>Thêm vào thư viện</Tooltip>}
          >
            <i className={`bi bi-heart ${styles.actionBtn}`}></i>
          </OverlayTrigger>
          <i className="bi bi-play-circle" style={{ fontSize: "35px" }}></i>
          <OverlayTrigger
            placement="top"
            delay={{ show: 100, hide: 100 }}
            overlay={<Tooltip>Khác</Tooltip>}
          >
            <i className={`bi bi-three-dots ${styles.actionBtn}`}></i>
          </OverlayTrigger>
        </div>
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.name}>{name}</div>
        <div className={styles.description}>{description}</div>
      </div>
    </div>
  );
}

PlaylistItem.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string
}