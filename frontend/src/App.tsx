import { Button, ColorSwatch, Group, Stack, Text, Title } from "@mantine/core";

import { useQuery } from "@tanstack/react-query";
import { GetToolPaths, InstallFfmpeg } from "../wailsjs/go/main/App";

const tools = ["ytdlp", "ffmpeg", "ffprobe"];
const jsRuntimes = ["deno", "bun", "node"];

function App() {
  const toolPaths = useQuery({
    queryKey: ["toolPaths"],
    queryFn: GetToolPaths,
  });

  return (
    <Stack mih="100vh" justify="center" align="center" c="white" bg="#1c1c1c">
      <Text>Nice</Text>
      <Title>Tool Status:</Title>
      {!toolPaths.isFetched || !toolPaths.data ? (
        <Text>Loading...</Text>
      ) : (
        tools.map((tool) => (
          <Group>
            <ColorSwatch key={tool} color={toolPaths.data[tool] ? "green" : "red"} />
            <Text key={tool}>
              {tool}: {toolPaths.data[tool] || "Not found"}
            </Text>
          </Group>
        ))
      )}

      <Button onClick={async () => console.log(await InstallFfmpeg())}>Install FFMPEG</Button>
      <Button onClick={() => toolPaths.refetch()} disabled={toolPaths.isLoading}>
        Get Tool Paths
      </Button>
    </Stack>
  );
}

export default App;
