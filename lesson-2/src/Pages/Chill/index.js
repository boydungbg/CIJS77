import { Container } from "react-bootstrap";
import PlaylistItem from "../../Components/PlaylistItem";
import styles from "./style.module.css";

const data = [
  {
    image: require("../../Assets/today_hits.webp"),
    name: "Today's V-Pop Hits",
    description: "KARIK, Only C và 30 bản Hits V-Pop nổi bật nhất hiện nay",
  },
  {
    image: require("../../Assets/nha_nha_nghe_gi.webp"),
    name: "Nhà Nhà Nghe Gì?",
    description: "Va vào những giai điệu nhà nhà đều nghe",
  },
  {
    image: require("../../Assets/mash_up_vpop.webp"),
    name: "Mashup V-Pop",
    description: "Những mảnh ghép tạo nên 1 bản Mashup hoàn hảo",
  },
  {
    image: require("../../Assets/top_hits_us_uk.webp"),
    name: "Top Hits US-UK",
    description: "Những bản Hits US-UK được nghe nhiều nhất trên Zing MP3",
  },
  {
    image: require("../../Assets/women_vpop.webp"),
    name: "Women Of V-Pop",
    description: "Tôn vinh tài năng và những sản phẩm âm nhạc nổi bật nhất…",
  },
];

export default function Chill() {
  return (
    <Container className={styles.container}>
      <Container className={styles.title}>Chờ-Iu Chill</Container>
      <Container className={styles.itemsContainer}>
        {/* ITEMS GO HERE */}
        {data.map((item, index) => {
          return (
            <PlaylistItem
              name={item.name}
              image={item.image}
              description={item.description}
              key={index}
            />
          );
        })}
      </Container>
    </Container>
  );
}
