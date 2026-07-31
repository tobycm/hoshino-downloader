import { Button, List, Loader, Modal, Stack, Text, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { GetToolPaths, InstallDeno, InstallFfmpeg, InstallYtdlp } from "../../wailsjs/go/main/App";
import { tools } from "../utils/tools";

export default function ToolsModal({ opened, onClose }: { opened: boolean; onClose: () => void }) {
  const toolPaths = useQuery({
    queryKey: ["GetToolPaths"],
    queryFn: () => GetToolPaths(),
  });

  useEffect(() => {
    if (!opened) return;

    toolPaths.refetch();
  }, [opened]);

  const installFfmpeg = useQuery({
    queryKey: ["install_ffmpeg"],
    queryFn: InstallFfmpeg,
    enabled: false,
  });

  const installYtdlp = useQuery({
    queryKey: ["install_ytdlp"],
    queryFn: InstallYtdlp,
    enabled: false,
  });

  const installDeno = useQuery({
    queryKey: ["install_deno"],
    queryFn: InstallDeno,
    enabled: false,
  });

  const missing = [...tools.filter((tool) => !toolPaths.data?.[tool as keyof typeof toolPaths.data])];

  return (
    <Modal opened={opened} onClose={onClose} title="Tools" size="lg">
      {toolPaths.data ? (
        missing.length > 0 ? (
          <Stack>
            <Title order={3}>Looks like you are missing some tools!</Title>

            <Text>Missing tools:</Text>
            <List>
              {!toolPaths.data.ffmpeg && (
                <List.Item>
                  ffmpeg: <MissingTool isFetching={installFfmpeg.isFetching} isInstalled={!!installFfmpeg.data} />
                </List.Item>
              )}
              {!toolPaths.data.ytdlp && (
                <List.Item>
                  ytdlp: <MissingTool isFetching={installYtdlp.isFetching} isInstalled={!!installYtdlp.data} />
                </List.Item>
              )}
              {!toolPaths.data.deno && (
                <List.Item>
                  deno: <MissingTool isFetching={installDeno.isFetching} isInstalled={!!installDeno.data} />
                </List.Item>
              )}
            </List>
            <Button
              onClick={async () => {
                const promises = [];
                if (!toolPaths.data.ffmpeg) {
                  promises.push(installFfmpeg.refetch());
                }
                if (!toolPaths.data.ytdlp) {
                  promises.push(installYtdlp.refetch());
                }
                if (!toolPaths.data.deno) {
                  promises.push(installDeno.refetch());
                }

                await Promise.all(promises);
                notifications.show({
                  title: "Tools Installed",
                  message: "All tools installed successfully!",
                });
                onClose();
              }}>
              Install the tools?
            </Button>
          </Stack>
        ) : (
          <Stack>
            <Title order={3}>All tools are installed!</Title>

            <Text>Tool locations:</Text>
            <List>
              {toolPaths.data?.ffmpeg && <List.Item>ffmpeg: {toolPaths.data.ffmpeg}</List.Item>}
              {toolPaths.data?.ytdlp && <List.Item>ytdlp: {toolPaths.data.ytdlp}</List.Item>}
              {toolPaths.data?.deno && <List.Item>deno: {toolPaths.data.deno}</List.Item>}
            </List>
          </Stack>
        )
      ) : (
        <Loader />
      )}
    </Modal>
  );
}

function MissingTool({ isFetching, isInstalled }: { isFetching: boolean; isInstalled: boolean | null }) {
  if (isFetching) {
    return (
      <>
        <Text>Installing...</Text>
        <Loader m="md" size="xs" />
      </>
    );
  }
  if (isInstalled) {
    return <Text>Installed ✅</Text>;
  }

  return <Text>Not installed ❌</Text>;
}
