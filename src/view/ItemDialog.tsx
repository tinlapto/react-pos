import {
  Divider,
  message,
  Modal,
  Checkbox,
  Row,
  Radio,
  Button,
  Skeleton,
} from "antd";
import { useEffect, useMemo, useState } from "react";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import InputNumber from "../component/InputNumber";
import { useGetItem } from "../api";
import { CartItem } from "../type";
import { queryClient } from "../App";

const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;

const ItemDialog = ({
  id,
  onAdd,
  onCancel,
}: {
  id: number | undefined;
  onAdd: (item: CartItem) => void;
  onCancel: () => void;
}) => {
  const [selectedToppings, setSelectedToppings] = useState<CheckboxValueType[]>(
    []
  );
  const [selectedSize, setSelectedSize] = useState<number>();
  const [count, setCount] = useState<number>(1);

  const {
    data: pizza,
    isLoading,
    refetch,
  } = useGetItem(
    { id: id as number },
    {
      enabled: false,
      onError: (err) => {
        message.error(err.message);
      },
      keepPreviousData: false,
    }
  );

  const { toppings, sizes } = useMemo(
    () => ({
      toppings: (pizza?.toppings ?? []).map(({ id, name }) => ({
        label: name,
        value: id,
      })),
      sizes: (pizza?.sizes ?? []).map(({ id, name }) => ({
        label: name,
        value: id,
      })),
    }),
    [pizza]
  );

  useEffect(() => {
    if (!id) return;
    queryClient.removeQueries("get-item");
    refetch();
    setSelectedToppings([]);
    setSelectedSize(undefined);
    setCount(1);
  }, [id, refetch]);

  const handleOnAdd = () => {
    onAdd({
      ...pizza,
      selectedToppings,
      selectedSize: selectedSize,
      count,
    } as CartItem);
  };

  return (
    <Modal
      visible={!!id}
      onOk={handleOnAdd}
      onCancel={() => onCancel()}
      title={isLoading ? "Loading..." : pizza?.title || "Unknown"}
      footer={
        <div style={{ display: "flex", width: "100%" }}>
          <div style={{ flex: 1 }}>
            <InputNumber value={count} onChange={setCount} min={1} max={10} />
          </div>
          <Button style={{ marginLeft: 8 }} key="back" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            key="submit"
            type="primary"
            onClick={handleOnAdd}
            disabled={isLoading}
          >
            Add To Cart
          </Button>
        </div>
      }
    >
      {isLoading ? (
        <Skeleton />
      ) : (
        <>
          <Row>
            <Divider orientation="left" orientationMargin="0">
              Topping
            </Divider>
            <CheckboxGroup
              options={toppings}
              value={selectedToppings}
              onChange={setSelectedToppings}
            />
          </Row>
          <Row>
            <Divider orientation="left" orientationMargin="0">
              Size
            </Divider>
            <RadioGroup
              options={sizes}
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
            />
          </Row>
        </>
      )}
    </Modal>
  );
};

export default ItemDialog;
