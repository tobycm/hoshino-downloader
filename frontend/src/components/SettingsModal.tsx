import { Button, Modal, Stack, Title } from "@mantine/core";

// TODO: default download options

export default function SettingsModal({ opened, onClose, openToolsModal }: { opened: boolean; onClose: () => void; openToolsModal?: () => void }) {
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
      </Stack>
    </Modal>
  );
}
