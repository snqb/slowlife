import {
  AccordionItemProps,
  Box,
  Button,
  Center,
  Grid,
  HStack,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";

import { PERIODS, PERIOD_TEXTS, Period } from "./constants";
import { Todo, TodoState, moveTask, removeTask, useAppDispatch } from "./store";

interface Props extends AccordionItemProps {
  task: Todo;
  where: keyof TodoState;
}

export const ShortTask = (props: Props) => {
  const { task, where, ...restItemProps } = props;
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onRemoveClick = () => {
    dispatch(
      removeTask({
        key: where,
        id: task.id,
      }),
    );
  };

  return (
    <>
      <VStack
        align="start"
        py={2}
        userSelect="none"
        {...restItemProps}
        spacing={0}
      >
        <HStack w="full" align="baseline" justify="space-between">
          <Title task={task} onOpen={onOpen} />
          <Button
            variant="ghost"
            size="xs"
            fontSize="md"
            fontWeight="bold"
            onClick={onRemoveClick}
            filter="saturate(0)"
          >
            ❌
          </Button>
        </HStack>
        <Overlay isOpen={isOpen} onClose={onClose} {...props} />
      </VStack>
    </>
  );
};

type OverlayProps = any;

const Overlay = ({ isOpen, onClose, task, where }: Props & OverlayProps) => {
  const dispatch = useAppDispatch();

  const handleMove = (period: Period) => {
    dispatch(
      moveTask({
        from: where,
        to: period,
        id: task.id,
      }),
    );

    onClose();
  };

  return (
    <Modal
      isCentered
      motionPreset="none"
      size="xl"
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay backdropFilter="blur(10px)" backdropBlur="1px" />
      <ModalContent bg="gray.900">
        <ModalHeader>
          <Heading as="h3" size="xl">
            {task.title.text}
          </Heading>
        </ModalHeader>
        <ModalBody>
          <Grid templateColumns="repeat(3, 1fr)" gap={2}>
            {PERIODS.map((period) => (
              <Button
                tabIndex={-1}
                key={period}
                minW="25vmin"
                minH="25vmin"
                aspectRatio="1/1"
                bg="blackAlpha.800"
                fontSize="sm"
                isDisabled={period === where}
                sx={{
                  _disabled: {
                    bg: "blackAlpha.100",
                  },
                }}
                onClick={() => handleMove(period)}
              >
                {period === where ? (
                  <Center
                    fontSize="large"
                    w="50px"
                    h="50px"
                    borderRadius="50%"
                    bg="gray.400"
                  >
                    {task.title.emoji}
                  </Center>
                ) : (
                  PERIOD_TEXTS[period]
                )}
              </Button>
            ))}
          </Grid>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="gray" mr={3} onClick={onClose}>
            ❌
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const Title = ({ task, onOpen }: Props & OverlayProps) => (
  <Box
    w="100%"
    textAlign="left"
    as="span"
    fontSize="xl"
    fontWeight={600}
    onClick={onOpen}
  >
    {task.title.emoji} {task.title.text}
  </Box>
);
