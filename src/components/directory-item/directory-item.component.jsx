import { useNavigate } from "react-router-dom";

import {
  BackgroundImage,
  Body,
  DirectoryItemContainer,
} from "./directory-item.styles";

const DirectoryItem = ({ category }) => {
  const { title, imageUrl, route } = category;

  const navigate = useNavigate();
  const onClickHandler = () => navigate(route);

  return (
    <DirectoryItemContainer onClick={onClickHandler}>
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>SHOP NOW</p>
      </Body>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;
