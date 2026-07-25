import { Button, Stack, Title } from "@mantine/core";

import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { CheckTools, InstallFfmpeg } from "../wailsjs/go/main/App";
import DownloadModal from "./components/DownloadModal";
import { useTools } from "./states/tools";

const tools = ["ytdlp", "ffmpeg"];
const jsRuntimes = ["deno", "bun", "node"];

function App() {
  const [downloadModalOpened, downloadModalControls] = useDisclosure();

  const toolPaths = useQuery({
    queryKey: ["CheckTools"],
    queryFn: () => CheckTools(false),
  });

  const setTools = useTools((state) => state.setTools);

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
    } else {
      notifications.show({
        title: "All Tools Found",
        message: "All required tools are installed.",
      });
    }
  }, [toolPaths.data]);

  return (
    <Stack mih="100vh" justify="center" align="center" c="white" bg="#1c1c1c">
      <DownloadModal opened={downloadModalOpened} onClose={downloadModalControls.close} />
      <Title>Hoshino Downloader</Title>

      <Button onClick={async () => console.log(await InstallFfmpeg())}>Install FFMPEG</Button>
      <Button onClick={() => downloadModalControls.open()} disabled={toolPaths.isLoading}>
        Download Video
      </Button>
    </Stack>
  );
}

export default App;
