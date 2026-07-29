import { Button, List, Loader, Modal, Text, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import { InstallDeno, InstallFfmpeg, InstallYtdlp } from "../../wailsjs/go/main/App";
import { useTools } from "../states/tools";

export default function MissingToolsModal({ opened, onClose }: { opened: boolean; onClose: () => void }) {
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

  const missing = useTools((state) => state.missing)!;

  return (
    <Modal opened={opened} onClose={onClose} title="Missing Tools">
      <Title order={3}>Looks like you are missing some tools!</Title>

      <Text>Missing tools:</Text>
      <List>
        {missing.includes("ffmpeg") && (
          <List.Item>
            ffmpeg:{" "}
            {!installFfmpeg.isFetched ? (
              <>
                <Text>"Installing..."</Text>
                <Loader m="md" size="xs" />
              </>
            ) : installFfmpeg.data ? (
              "Installed ✅"
            ) : (
              "Not installed ❌"
            )}
          </List.Item>
        )}
        {missing.includes("ytdlp") && (
          <List.Item>
            ytdlp:{" "}
            {!installYtdlp.isFetched ? (
              <>
                <Text>"Installing..."</Text>
                <Loader m="md" size="xs" />
              </>
            ) : installYtdlp.data ? (
              "Installed ✅"
            ) : (
              "Not installed ❌"
            )}
          </List.Item>
        )}
        {missing.includes("deno") && (
          <List.Item>
            deno:{" "}
            {!installDeno.isFetched ? (
              <>
                <Text>"Installing..."</Text>
                <Loader m="md" size="xs" />
              </>
            ) : installDeno.data ? (
              "Installed ✅"
            ) : (
              "Not installed ❌"
            )}
          </List.Item>
        )}
      </List>

      <Button
        onClick={async () => {
          const promises = [];
          if (missing.includes("ffmpeg")) {
            promises.push(installFfmpeg.refetch());
          }
          if (missing.includes("ytdlp")) {
            promises.push(installYtdlp.refetch());
          }
          if (missing.includes("deno")) {
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
    </Modal>
  );
}
