import { Center, Loader } from "@mantine/core";

export default function LoadingScreen() {
  return (
    <Center h="100%" w="100%" mih={200}>
      <Loader size="lg" />
    </Center>
  );
}
