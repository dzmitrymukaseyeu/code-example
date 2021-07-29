import React from 'react';
import InboxIcon from '@material-ui/icons/Inbox';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from '@material-ui/core';
import { EmptyVoidFunction } from '../../utils/types';

const defaultProps = {
  handleClose: () => {},
};

function Mock(props: {
  handleClose?: EmptyVoidFunction;
}) {
  const { handleClose } = props;
  const [isShow, setIsShow] = React.useState(false);

  const handleSave = () => {
    setIsShow(true);
  };

  return (
    <List className="tackles-list">
      {[0, 1, 2].map((tackle) => (
        <ListItem button key={tackle}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText>{tackle}</ListItemText>
        </ListItem>
      ))}
      {isShow ? (
        <div data-testid="true-element" />
      ) : (
        <div data-testid="false-element" />
      )}
      <Button variant="outlined" color="primary" onClick={handleSave}>
        Сохранить
      </Button>
      <Button variant="outlined" color="primary" onClick={handleClose}>
        Закрыть
      </Button>
    </List>
  );
}

export default Mock;

Mock.defaultProps = defaultProps;