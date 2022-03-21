import { Button, Col, Popconfirm, Row } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { CartItem as TypeCartItem } from "../type";

const CartItem = ({
  item,
  onRemove,
}: {
  item: TypeCartItem;
  onRemove: () => void;
}) => {
  const {
    title,
    price,
    count,
    toppings,
    selectedToppings,
    sizes,
    selectedSize,
  } = item;
  return (
    <Row
      style={{
        margin: "5px 0",
        borderBottom: "0.1px solid #eee",
        padding: "5px 0",
      }}
      gutter={10}
    >
      <Col style={{ display: "flex", alignItems: "center" }} span={4}>
        <Popconfirm
          title={"Confirm to remove item?"}
          okText={"Remove"}
          okButtonProps={{ danger: true }}
          onConfirm={onRemove}
        >
          <Button size={"small"} danger icon={<CloseOutlined />} />
        </Popconfirm>
      </Col>
      <Col style={{ textAlign: "right" }} span={16}>
        <div>
          {count} X {title}
        </div>
        <div>
          {toppings
            .filter(({ id }) => selectedToppings.includes(id))
            .map(({ name }, index) => (
              <div key={index} style={{ color: "#aaa", fontSize: 12 }}>
                {name}
              </div>
            ))}
        </div>
        <div>
          <div style={{ color: "#aaa", fontSize: 12 }}>
            {sizes.find(({ id }) => selectedSize === id)?.name}
          </div>
        </div>
      </Col>
      <Col
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "right",
        }}
        span={4}
      >
        ${price}
      </Col>
    </Row>
  );
};

export default CartItem;
