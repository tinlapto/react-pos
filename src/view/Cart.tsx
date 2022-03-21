import { Button, Col, Divider, Popconfirm, Row } from "antd";
import { CloseOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import CartItem from "../component/CartItem";
import { CartItem as TypeCartItem } from "../type";

const Cart = ({
  items,
  setItems,
}: {
  items: TypeCartItem[];
  setItems: (items: TypeCartItem[]) => void;
}) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ flex: 1, overflow: "auto" }}>
        {items.length === 0 && (
          <Row>
            <Col span={24} style={{ textAlign: "center", padding: 20 }}>
              No items
            </Col>
          </Row>
        )}
        {items.map((item, index) => (
          <CartItem
            key={index}
            item={item}
            onRemove={() => setItems(items.filter((_, i) => i !== index))}
          />
        ))}
        <Divider />
        <Row justify="end" gutter={10}>
          <Col style={{ textAlign: "right" }} span={10}>
            Total:
          </Col>
          <Col span={4}>
            ${items.reduce((v, item) => item.price * item.count + v, 0)}
          </Col>
        </Row>
      </div>
      <div style={{ display: "flex" }}>
        <Button
          style={{ flex: 1, marginRight: 5 }}
          type="primary"
          size={"large"}
          icon={<ShoppingCartOutlined />}
          disabled={items.length === 0}
        >
          Checkout
        </Button>
        <Popconfirm
          title={"Confirm to remove all items?"}
          onConfirm={() => setItems([])}
          okText={"Remove"}
          okButtonProps={{ danger: true }}
          disabled={items.length === 0}
        >
          <Button
            type="primary"
            size={"large"}
            disabled={items.length === 0}
            danger
            icon={<CloseOutlined />}
          />
        </Popconfirm>
      </div>
    </div>
  );
};

export default Cart;
