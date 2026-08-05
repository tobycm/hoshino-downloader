import { Button, Code, Group, Modal, Stack, Title, Tooltip } from "@mantine/core";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { GetDebugInfo, GetUpdateInfo, InstallDeno, InstallFfmpeg, InstallYtdlp } from "../../wailsjs/go/main/App";
import TestForm from "./TestForm";

// TODO: default download options

export default function SettingsModal({ opened, onClose, openToolsModal }: { opened: boolean; onClose: () => void; openToolsModal?: () => void }) {
  const queryClient = useQueryClient();

  const debugInfo = useQuery({
    queryKey: ["GetDebugInfo"],
    queryFn: GetDebugInfo,
  });

  useEffect(() => {
    if (!opened) return;

    debugInfo.refetch();
  }, [opened]);

  const [testInfo, setTestInfo] = useState<any | null>(null);

  const updateInfo = useQuery({
    queryKey: ["GetUpdateInfo"],
    queryFn: GetUpdateInfo,
  });

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

  const canUpdate = updateInfo.data?.CanUpdateYtdlp;

  return (
    <Modal opened={opened} onClose={onClose} centered size="lg">
      <Stack gap="md" mih="60vh">
        <Title order={1}>Settings</Title>
        <Stack>
          <Title order={2}>Tools</Title>

          <Group>
            <Button
              disabled={updateInfo.isFetching}
              onClick={() => {
                updateInfo.refetch();
                debugInfo.refetch();
              }}>
              Check for update
            </Button>
            <Tooltip disabled={!!canUpdate} label="Your tools are already up to date.">
              <Button
                disabled={updateInfo.isFetching || installFfmpeg.isLoading || installYtdlp.isLoading || installDeno.isLoading || !canUpdate}
                onClick={async () => {
                  if (!updateInfo.data?.CanUpdateYtdlp || !updateInfo.data?.CanUpdateDeno) return;

                  if (updateInfo.data?.CanUpdateDeno) {
                    await installDeno.refetch();
                  }

                  if (updateInfo.data?.CanUpdateYtdlp) {
                    await installYtdlp.refetch();
                  }

                  await queryClient.invalidateQueries({ queryKey: ["GetUpdateInfo", "GetToolPaths", "GetDebugInfo"] });
                  debugInfo.refetch();
                  updateInfo.refetch();
                }}>
                Update all
              </Button>
            </Tooltip>
          </Group>
        </Stack>

        <Stack>
          <Title order={2}>Debug Info</Title>
          <Code block>{JSON.stringify(debugInfo.data, null, 2)}</Code>
        </Stack>

        {/* <Button
          onClick={() => {
            onClose();
            openToolsModal?.();
          }}>
          Check for tools
        </Button> */}

        <Stack>
          <Title order={2}>Test</Title>
          <TestForm onTestComplete={(data) => setTestInfo(data)} />
          <Code block>{JSON.stringify(testInfo, null, 2)}</Code>
        </Stack>
      </Stack>
    </Modal>
  );
}
