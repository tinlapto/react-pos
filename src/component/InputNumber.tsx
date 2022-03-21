import { Input } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

const InputNumber = ({
  value,
  onChange,
  min,
  max,
}: {
  value: number;
  onChange: (number: number) => void;
  min?: number;
  max?: number;
}) => {
  const handleOnChange = (value: any) => {
    if (!Number.isInteger(value)) return;
    if (max !== undefined && value > max) return;
    if (min !== undefined && value < min) return;
    onChange(value);
  };
  return (
    <Input
      style={{ textAlign: "right" }}
      value={value}
      onChange={(e) => handleOnChange(Number(e.target.value))}
      addonBefore={<PlusOutlined onClick={() => handleOnChange(value + 1)} />}
      addonAfter={<MinusOutlined onClick={() => handleOnChange(value - 1)} />}
    />
  );
};

export default InputNumber;
