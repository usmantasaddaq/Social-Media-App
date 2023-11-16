import React from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import FollowersCard2 from "../FollowersCard2/FollowersCard2";

const FollowingModal2 = ({ modalOpened, setModalOpened, post  }) => {
  const theme = useMantineTheme();
  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="55%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >

    <FollowersCard2 location='modal' post={post}/>
    </Modal>
  );
};

export default FollowingModal2;
