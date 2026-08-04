import { Button, Group, List, Loader, Modal, Stack, Text, Title, Tooltip } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconDownload } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { GetToolPaths, InstallDeno, InstallFfmpeg, InstallYtdlp } from "../../wailsjs/go/main/App";
import { tools } from "../utils/tools";

export default function ToolsModal({ opened, onClose }: { opened: boolean; onClose: () => void }) {
  const toolPaths = useQuery({
    queryKey: ["GetToolPaths"],
    queryFn: GetToolPaths,
  });

  useEffect(() => {
    if (!opened) return;

    toolPaths.refetch();
  }, [opened]);

  const installFfmpeg = useQuery({
    queryKey: ["InstallFfmpeg"],
    queryFn: InstallFfmpeg,
    enabled: false,
  });

  const installYtdlp = useQuery({
    queryKey: ["InstallYtdlp"],
    queryFn: InstallYtdlp,
    enabled: false,
  });

  const installDeno = useQuery({
    queryKey: ["InstallDeno"],
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
                  <MissingTool
                    name="ffmpeg"
                    isFetching={installFfmpeg.isFetching}
                    isInstalled={!!installFfmpeg.data}
                    redownload={() => installFfmpeg.refetch()}
                  />
                </List.Item>
              )}
              {!toolPaths.data.ytdlp && (
                <List.Item>
                  <MissingTool
                    name="ytdlp"
                    isFetching={installYtdlp.isFetching}
                    isInstalled={!!installYtdlp.data}
                    redownload={() => installYtdlp.refetch()}
                  />
                </List.Item>
              )}
              {!toolPaths.data.deno && (
                <List.Item>
                  <MissingTool
                    name="deno"
                    isFetching={installDeno.isFetching}
                    isInstalled={!!installDeno.data}
                    redownload={() => installDeno.refetch()}
                  />
                </List.Item>
              )}
            </List>
            <Button
              disabled={installFfmpeg.isFetching || installYtdlp.isFetching || installDeno.isFetching}
              leftSection={<IconDownload />}
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
              Install
            </Button>
          </Stack>
        ) : (
          <Stack>
            <Title order={3}>All tools are installed!</Title>

            <Text>Tools info:</Text>
            <List spacing="md">
              {toolPaths.data?.ffmpeg && (
                <List.Item>
                  <MissingTool
                    name="ffmpeg"
                    isFetching={installFfmpeg.isFetching}
                    isInstalled
                    location={toolPaths.data.ffmpeg}
                    redownload={() => installFfmpeg.refetch()}
                  />
                </List.Item>
              )}
              {toolPaths.data?.ytdlp && (
                <List.Item>
                  <MissingTool
                    name="ytdlp"
                    isFetching={installYtdlp.isFetching}
                    isInstalled
                    location={toolPaths.data.ytdlp}
                    redownload={() => installYtdlp.refetch()}
                  />
                </List.Item>
              )}
              {toolPaths.data?.deno && (
                <List.Item>
                  <MissingTool
                    name="deno"
                    isFetching={installDeno.isFetching}
                    isInstalled
                    location={toolPaths.data.deno}
                    redownload={() => installDeno.refetch()}
                  />
                </List.Item>
              )}
            </List>
          </Stack>
        )
      ) : (
        <Loader />
      )}
    </Modal>
  );
}

function MissingTool({
  name,
  isFetching,
  isInstalled,
  location,
  redownload,
}: {
  name: string;
  isFetching: boolean;
  isInstalled: boolean | null;
  location?: string;
  redownload: () => void;
}) {
  if (isFetching) {
    return (
      <Group>
        <Text>{name}:</Text>
        <Text>Installing...</Text>
        <Loader m="md" size="xs" />
      </Group>
    );
  }
  if (isInstalled) {
    return (
      <Group>
        <Text>{name}:</Text>
        <Tooltip label={"Location: " + location}>
          <Text>Installed ✅</Text>
        </Tooltip>
        <Button variant="outline" onClick={redownload} leftSection={<IconDownload />}>
          Redownload
        </Button>
      </Group>
    );
  }

  return (
    <Group>
      <Text>{name}:</Text>
      <Text>Not installed ❌</Text>
    </Group>
  );
}
