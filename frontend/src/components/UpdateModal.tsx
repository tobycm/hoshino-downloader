import { Button, Modal, Stack, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { GetUpdateInfo, InstallDeno, InstallFfmpeg, InstallYtdlp } from "../../wailsjs/go/main/App";

export default function UpdateModal({ opened, onClose }: { opened: boolean; onClose: () => void }) {
  const updateInfo = useQuery({
    queryKey: ["GetUpdateInfo"],
    queryFn: () => GetUpdateInfo(),
  });

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

  return (
    <Modal opened={opened} onClose={onClose}>
      <Stack>
        <Title order={3}>Some of your tools are out of date!</Title>
        <Button
          disabled={updateInfo.isLoading || !updateInfo.data?.CanUpdateYtdlp}
          onClick={() => {
            if (updateInfo.data?.CanUpdateYtdlp) {
              installYtdlp.refetch();
            }
          }}>
          Update all
        </Button>
        <Button variant="outline" onClick={onClose}>
          Dismiss
        </Button>
      </Stack>
    </Modal>
  );
}
