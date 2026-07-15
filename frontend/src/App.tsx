import { Button, ColorSwatch, Group, Stack, Text, Title } from "@mantine/core";

import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import { CheckTools, InstallFfmpeg } from "../wailsjs/go/main/App";
import DownloadModal from "./components/DownloadModal";

const tools = ["ytdlp", "ffmpeg", "ffprobe"];
const jsRuntimes = ["deno", "bun", "node"];

function App() {
  const [downloadModalOpened, downloadModalControls] = useDisclosure();

  const toolPaths = useQuery({
    queryKey: ["CheckTools"],
    queryFn: async () => await CheckTools(false),
  });

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

  return (
    <Stack mih="100vh" justify="center" align="center" c="white" bg="#1c1c1c">
      <DownloadModal opened={downloadModalOpened} onClose={downloadModalControls.close} />
      <Text>Nice</Text>
      <Title>Tool Status:</Title>
      {!toolPaths.isFetched || !toolPaths.data ? (
        <Text>Loading...</Text>
      ) : (
        <Stack>
          {tools.map((tool) => (
            <Group key={tool}>
              <ColorSwatch key={tool} color={toolPaths.data[tool as keyof typeof toolPaths.data] ? "green" : "red"} />
              <Text key={tool}>
                {tool}: {toolPaths.data[tool as keyof typeof toolPaths.data] || "Not found"}
              </Text>
            </Group>
          ))}
          {jsRuntime && (
            <Group>
              <ColorSwatch color={toolPaths.data[jsRuntime as keyof typeof toolPaths.data] ? "green" : "red"} />

              <Text>
                {jsRuntime}: {toolPaths.data[jsRuntime as keyof typeof toolPaths.data]}
              </Text>
            </Group>
          )}
        </Stack>
      )}

      <Button onClick={async () => console.log(await InstallFfmpeg())}>Install FFMPEG</Button>
      <Button onClick={() => toolPaths.refetch()} disabled={toolPaths.isLoading}>
        Get Tool Paths
      </Button>
      <Button onClick={() => downloadModalControls.open()} disabled={toolPaths.isLoading}>
        Download Video
      </Button>
    </Stack>
  );
}

export default App;
