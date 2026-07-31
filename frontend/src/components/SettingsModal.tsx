import { Button, Code, Modal, Stack, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { GetDebugInfo } from "../../wailsjs/go/main/App";

// TODO: default download options

export default function SettingsModal({ opened, onClose, openToolsModal }: { opened: boolean; onClose: () => void; openToolsModal?: () => void }) {
  const debugInfo = useQuery({
    queryKey: ["GetDebugInfo"],
    queryFn: () => GetDebugInfo(),
  });

  return (
    <Modal opened={opened} onClose={onClose} centered>
      <Stack gap="md" mih="60vh">
        <Title order={1}>Settings</Title>
        <Button
          onClick={() => {
            onClose();
            openToolsModal?.();
          }}>
          Check for tools
        </Button>
        <Code block>Debug info: {JSON.stringify(debugInfo.data, null, 2)}</Code>
      </Stack>
    </Modal>
  );
}
