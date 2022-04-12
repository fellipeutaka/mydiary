import NextLink from "next/link";
import Image from "next/image";
import {
  Avatar,
  Button,
  Flex,
  Modal,
  Stack,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { IoExitOutline, IoHomeOutline } from "react-icons/io5";
import {
  AiOutlineCalendar,
  AiOutlineHeart,
  AiOutlinePlus,
  AiOutlineUser,
} from "react-icons/ai";
import AddNote from "components/Forms/AddNote";
import { useAuth } from "hooks/useAuth";

export default function Header() {
  const { user, authMethods } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      as="header"
      h="68px"
      justifyContent="space-between"
      alignItems="center"
      px={6}
    >
      <Stack direction="row" alignItems="center">
        <NextLink href="/app" passHref>
          <Button>
            <IoHomeOutline />
          </Button>
        </NextLink>
        <Button>
          <AiOutlineCalendar />
        </Button>
      </Stack>

      <Flex alignItems="center" display={["none", "flex"]}>
        <Image src="/logo.png" alt="My Diary logo" width="48px" height="48px" />
        <Text fontWeight="bold">My Diary</Text>
      </Flex>

      <Stack direction="row" alignItems="center">
        <Button onClick={onOpen}>
          <AiOutlinePlus />
        </Button>
        <Button>
          <AiOutlineHeart />
        </Button>
        <Button onClick={authMethods.signOut}>
          <IoExitOutline />
        </Button>
        <Tooltip label={user?.displayName}>
          <Avatar
            src={user?.photoURL || ""}
            icon={<AiOutlineUser fontSize="1.5rem" />}
          />
        </Tooltip>
      </Stack>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <AddNote uid={user?.uid} onClose={onClose} />
      </Modal>
    </Flex>
  );
}
