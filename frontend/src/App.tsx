import { Button, Group, Image, Stack, TextInput, Title } from "@mantine/core";

import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";
import { CheckTools } from "../wailsjs/go/main/App";
import DownloadModal from "./components/DownloadModal";
import MissingToolsModal from "./components/MissingToolsModal";
import { useAppState } from "./states/app";
import { useTools, type Tool } from "./states/tools";

import hoshino from "./assets/hoshino smol.jpg";

const tools = ["ytdlp", "ffmpeg"];
const jsRuntimes = ["deno", "bun", "node"];

function App() {
  const [downloadModalOpened, downloadModalControls] = useDisclosure();
  const [missingToolsModalOpened, missingToolsModalControls] = useDisclosure();
  const url = useAppState((state) => state.url);
  const setUrl = useAppState(useShallow((state) => state.setUrl));
  const toolPaths = useQuery({
    queryKey: ["CheckTools"],
    queryFn: () => CheckTools(false),
  });

  const setTools = useTools((state) => state.setTools);
  const setMissing = useTools((state) => state.setMissing);

  useEffect(() => {
    if (!toolPaths.data) return;

    setTools({
      ytdlp: toolPaths.data.ytdlp,
      ffmpeg: toolPaths.data.ffmpeg,
      deno: toolPaths.data.deno,
      bun: toolPaths.data.bun,
      node: toolPaths.data.node,
    });
  }, [toolPaths.data]);

  useEffect(() => {
    if (!toolPaths.data) return;

    const jsRuntime = jsRuntimes.find((runtime) => toolPaths.data?.[runtime as keyof typeof toolPaths.data]);

    const missing = [...tools.filter((tool) => !toolPaths.data?.[tool as keyof typeof toolPaths.data])];

    if (!jsRuntime) missing.push("deno");

    if (missing.length > 0) {
      notifications.show({
        title: "Missing Tools",
        message: `The following tools are missing: ${missing.join(", ")}`,
      });

      setMissing(missing as Tool[]);

      missingToolsModalControls.open();
    } else {
      notifications.show({
        title: "All Tools Found",
        message: "All required tools are installed.",
      });
    }
  }, [toolPaths.data]);

  return (
    <Stack mih="100vh" justify="center" align="center" c="white" bg="#1c1c1c" ta="center">
      <DownloadModal opened={downloadModalOpened} onClose={downloadModalControls.close} />
      <MissingToolsModal opened={missingToolsModalOpened} onClose={missingToolsModalControls.close} />

      <Image src={hoshino} w="20vw" h="20vw" bdrs="xl" />
      <Title>Hoshino Downloader</Title>

      <Group>
        <TextInput
          placeholder="Enter URL here"
          value={url}
          styles={{
            input: {
              color: "white",
              background: "transparent",
            },
          }}
          w="50vw"
          onChange={(event) => setUrl(event.currentTarget.value)}
        />
        <Button onClick={() => downloadModalControls.open()} disabled={toolPaths.isLoading}>
          Download
        </Button>
      </Group>
    </Stack>
  );
}

export default App;
