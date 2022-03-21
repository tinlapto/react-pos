import Card from "../component/Card";
import { useGetItems } from "../api";

const Gallery = ({ onClick: onCardClick }: { onClick: Function }) => {
  const { data: items = [] } = useGetItems();
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {items.map(({ id, title, price, photo }) => (
        <Card
          key={id}
          title={`${title} - $${price}`}
          photo={photo}
          onClick={() => {
            onCardClick(id);
          }}
        />
      ))}
    </div>
  );
};

export default Gallery;
