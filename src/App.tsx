import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  StyleProps,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import Bucket from "./Bucket";

import { PropsWithChildren, useEffect, useState } from "react";
import { usePageVisibility } from "react-page-visibility";
import ReloadPrompt from "./ReloadPrompt";
import { store, Thingy, webrtcProvider } from "./store";
import { SyncInput } from "./SyncInput";
import Today from "./Today";

import { useSyncedStore } from "@syncedstore/react";

const panelStyles: StyleProps = {
  h: "100%", // so that it fills the whole screen
  p: 2,
  pb: "40vh",
};

localStorage.setItem("log", "y-webrtc");

function App() {
  const [tab, setTab] = usePersistedTab();
  const today = useSyncedStore(store.today);
  const connected = useRtcConnectionShit();
  const hasDone = today.some((task) => task.progress === 100);

  return (
    <Flex px={[2, 5, 10, 20, 300]} py={[4, 1, 1, 1, 1, 10]} direction="column">
      <Tabs
        orientation="vertical"
        px={0}
        variant="soft-rounded"
        index={tab}
        onChange={setTab}
        align="center"
      >
        <TabPanels>
          <TabPanel {...panelStyles}>
            <HeadingSection title="Bucket" emoji="🪣" />
            <Bucket />
          </TabPanel>

          <TabPanel {...panelStyles}>
            <HeadingSection title="Today" emoji="🏄‍♂️">
              {hasDone && (
                <Button
                  w="fit-content"
                  variant="ghost"
                  ml="auto"
                  fontSize="x-large"
                  // h="50px"
                  bg="blackAlpha.900"
                  onClick={() => {
                    const cleanup = () => {
                      const doneIndex = today.findIndex(
                        (it: Thingy) => it.progress === 100
                      );
                      if (doneIndex < 0) {
                        return;
                      }

                      // we recursively delete them because syncedstore doesn't support `filter`, as we have to mutate
                      today.splice(doneIndex, 1);
                      cleanup();
                    };

                    cleanup();
                  }}
                >
                  🗑️
                </Button>
              )}
            </HeadingSection>
            <Today />
          </TabPanel>
          {/* <TabPanel>
            <Heading size="xl" mb={4} textAlign="left">
              <Box fontSize="xl" as="span">
                ⚙️&nbsp;
              </Box>
              Settings
            </Heading>
            <SyncInput />
          </TabPanel> */}
        </TabPanels>
        <TabList
          position="fixed"
          maxHeight="30vh"
          top="70%"
          borderLeftRadius="30%"
          p={3}
          // backdropFilter="blur(10px)"
          right={0}
          zIndex={2}
          bottom="0"
          bg="blackAlpha.800"
        >
          <Tab>
            <Heading size="lg">🪣</Heading>
          </Tab>
          <Tab mb={4}>
            <Heading size="lg">🏄‍♂️</Heading>
          </Tab>
          {/* <Tab mb={4}>
            <Heading size="sm">⚙️</Heading>
          </Tab> */}
          {/* <IconButton
            onClick={() => {
              window.location.reload();
            }}
            aria-label="sync"
            icon={<>🔄️</>}
            variant="ghost"
            filter={connected ? "grayscale(1)" : "initial"}
          /> */}
        </TabList>
      </Tabs>
      <ReloadPrompt />
    </Flex>
  );
}

export default App;

const usePersistedTab = () => {
  const tabState = useState(Number(localStorage.getItem("current-tab")) ?? 0);

  const [tab, setTab] = tabState;

  useEffect(() => {
    localStorage.setItem("current-tab", tab.toString());
  }, [tab]);

  return tabState;
};

const useRtcConnectionShit = () => {
  const isVisible = usePageVisibility();
  const [connected, setIsConnected] = useState(
    webrtcProvider?.connected ?? false
  );

  useEffect(() => {
    webrtcProvider?.connect();
  }, [isVisible]);

  useEffect(() => {
    if (!webrtcProvider) return;
    const { connected } = webrtcProvider;
    setIsConnected(connected);

    if (!connected) {
      webrtcProvider.connect();
    }

    return () => {
      webrtcProvider.disconnect();
    };
  }, [webrtcProvider?.connected]);

  return connected;
};

const HeadingSection = ({
  title,
  emoji,
  children,
}: PropsWithChildren<{ title: string; emoji: string }>) => {
  return (
    <Flex
      w="full"
      align="center"
      justify="space-between"
      position="sticky"
      top={0}
      py={1}
      mb={4}
      zIndex={2}
    >
      <Heading bg="black" size="xl" textAlign="left">
        <EmojiThing>{emoji}</EmojiThing>
        {title}
      </Heading>
      <Box>{children}</Box>
    </Flex>
  );
};

const EmojiThing = ({ children }: PropsWithChildren) => {
  return (
    <Box fontSize="xl" as="span">
      {children}&nbsp;
    </Box>
  );
};
