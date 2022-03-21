import { Col, Row } from "antd";
import Cart from "./Cart";
import Gallery from "./Gallery";
import { useState } from "react";
import ItemDialog from "./ItemDialog";
import { CartItem } from "../type";
import styled from "styled-components";

const Container = styled.div`
  border: 1px solid #ddd;
  width: 100%;
  border-radius: 5px;
  padding: 10px;
  height: 100%;
`;

const Main = () => {
  const [activeItemId, setActiveItemId] = useState<number>();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const onCardClick = (id: number) => {
    setActiveItemId(id);
  };

  const onAddCart = (item: CartItem) => {
    setCartItems([...cartItems, item]);
    setActiveItemId(undefined);
  };

  return (
    <>
      <Row style={{ height: "100vh" }}>
        <Col
          span={18}
          style={{ height: "100%", padding: "10px 5px 10px 10px" }}
        >
          <Container style={{ overflow: "auto" }}>
            <Gallery onClick={onCardClick} />
          </Container>
        </Col>
        <Col span={6} style={{ height: "100%", padding: "10px 10px 10px 5px" }}>
          <Container>
            <Cart items={cartItems} setItems={setCartItems} />
          </Container>
        </Col>
      </Row>
      <ItemDialog
        id={activeItemId}
        onAdd={onAddCart}
        onCancel={() => setActiveItemId(undefined)}
      />
    </>
  );
};

export default Main;
