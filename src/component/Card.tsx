import { Button } from "antd";
import styled from "styled-components";

const StyledCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 5px;
  flex: 0 1 20%;
  min-width: 200px;
  height: 300px;
  margin: 5px;
  display: flex;
  flex-direction: column;
  padding: 5px;
  cursor: pointer;
`;

type PhotoArgs = {
  url: string;
};
const Photo = styled.div<PhotoArgs>`
  flex: 1;
  overflow: hidden;
  border-radius: 5px;
  text-align: center;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${(prop) => prop.url});
`;

const StyledTitle = styled.div`
  text-align: center;
  padding: 10px 0;
  white-space: nowrap;
  overflow: hidden;
`;

const Card = ({
  title,
  photo,
  onClick,
}: {
  title: string;
  photo: string;
  onClick: Function;
}) => (
  <StyledCard onClick={() => onClick()}>
    <Photo url={photo} />
    <StyledTitle>{title}</StyledTitle>
    <Button style={{ width: "100%" }}>Choose</Button>
  </StyledCard>
);

export default Card;
