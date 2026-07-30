import { AppShell, Button, Group, Image, NavLink, Stack, TextInput, Title } from "@mantine/core";

import { useDisclosure, useHover } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";
import { CheckTools } from "../wailsjs/go/main/App";
import DownloadModal from "./components/DownloadModal";
import MissingToolsModal from "./components/MissingToolsModal";
import { useAppState } from "./states/app";
import { useTools, type Tool } from "./states/tools";

import { IconHome, IconSettings } from "@tabler/icons-react";
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

  const { ref: sidebarRef, hovered: sidebarHovered } = useHover();

  return (
    <AppShell
      navbar={{
        width: 80,
        breakpoint: 0,
      }}
      styles={{
        navbar: {
          zIndex: 10,
          transition: "width 0.3s ease",
          overflow: "hidden",
        },
      }}>
      <AppShell.Navbar w={sidebarHovered ? 200 : 64} ref={sidebarRef}>
        <Stack justify="center" align="center">
          <Image src={hoshino} p="sm" w="100%" bdrs="xl" style={{ aspectRatio: 1 / 1 }} />
          <NavLink
            href="#required-for-focus"
            styles={{ label: { fontSize: "1.25rem", fontWeight: 900 } }}
            label={sidebarHovered ? "Home" : undefined}
            leftSection={<IconHome size={40} />}
          />
          <NavLink
            href="#required-for-focus"
            styles={{ label: { fontSize: "1.25rem", fontWeight: 900 } }}
            fz="xl"
            label={sidebarHovered ? "Settings" : undefined}
            leftSection={<IconSettings size={40} />}
          />
        </Stack>
      </AppShell.Navbar>
      <AppShell.Main>
        <Stack mih="100vh" pb="30vh" w="calc(100vw - 80px)" justify="center" align="center" c="white" ta="center">
          <DownloadModal opened={downloadModalOpened} onClose={downloadModalControls.close} />
          <MissingToolsModal opened={missingToolsModalOpened} onClose={missingToolsModalControls.close} />

          <Image src={hoshino} w="20vw" h="20vw" bdrs="xl" />
          <Title>Hoshino Downloader</Title>

          <Group>
            <TextInput placeholder="Enter URL here" value={url} w="50vw" onChange={(event) => setUrl(event.currentTarget.value)} />
            <Button onClick={() => downloadModalControls.open()} disabled={toolPaths.isLoading}>
              Download
            </Button>
          </Group>
        </Stack>
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
