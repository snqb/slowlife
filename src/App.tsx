import {
  Flex,
  Heading,
  HStack,
  Spacer,
  StackDivider,
  VStack,
} from "@chakra-ui/react";

import { useEffect, useRef, useState } from "react";
import ReloadPrompt from "./ReloadPrompt";
import Today from "./Today";

import Later from "./Later";
import Bucket from "./Bucket";
import { Clean } from "./@components/Clean";
import { Swiper, SwiperSlide } from "swiper/react";

function App() {
  return (
    <Flex px={[5, 5, 10, 20, 300]} pt={12} pb={128} maxW="500px">
      <Swiper
        style={{
          height: "90vh",
          width: "100%",
        }}
        direction="vertical"
        slidesPerView="auto"
        spaceBetween={16}
        centeredSlides
        autoHeight
      >
        <SwiperSlide>
          <VStack align="stretch" minH="50vh" spacing={8}>
            <Heading size="2xl">Short</Heading>
            <Later />
          </VStack>
        </SwiperSlide>

        <SwiperSlide>
          <VStack
            overflowY="auto"
            align="stretch"
            minH="50vh"
            h="max-content"
            spacing={8}
          >
            <HStack justify="space-between">
              <Heading size="2xl">Long</Heading>
              <Clean what="today" />
            </HStack>

            <Today />
          </VStack>
        </SwiperSlide>

        <SwiperSlide>
          <VStack align="stretch" minH="50vh" spacing={8}>
            <HStack justify="space-between">
              <Heading size="2xl">Bucket</Heading>
              <Clean what="bucket" />
            </HStack>
            <Bucket />
          </VStack>
        </SwiperSlide>
      </Swiper>

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
