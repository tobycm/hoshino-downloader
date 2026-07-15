import { ActionIcon, Button, Modal, Stack, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconClipboard, IconFolderOpen } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { Download, GetOutputFolder } from "../../wailsjs/go/main/App";
import { ClipboardGetText } from "../../wailsjs/runtime";

export default function DownloadModal({ opened, onClose }: { opened: boolean; onClose: () => void }) {
  const form = useForm({
    initialValues: {
      Url: "",
      OutputFolder: "~",
    },
    validate: {
      Url: isNotEmpty("URL is required"),
      OutputFolder: isNotEmpty("Output folder is required"),
    },
  });

  const first = useRef(true);

  const getOutputFolder = useMutation({
    mutationFn: GetOutputFolder,
    onSuccess: (data) => {
      form.setFieldValue("OutputFolder", data);
    },
  });

  const getClipboard = useMutation({
    mutationFn: ClipboardGetText,
    onSuccess: (data) => {
      const url = data.match(/https?:\/\/[^\s'"]+/)?.[0];
      if (first.current) {
        first.current = false;
        if (!url) return;
      }
      form.setFieldValue("Url", url ? url : data);
    },
  });

  useEffect(() => {
    first.current = opened;
    if (opened) {
      getClipboard.mutate();
    }
  }, [opened]);

  const download = useMutation({
    mutationFn: (values: typeof form.values) => Download(values),
    onSuccess: () => {
      notifications.show({
        title: "Download Completed",
        message: "The download has been completed successfully.",
      });
    },
  });

  return (
    <Modal opened={opened} onClose={onClose} title="Download URL">
      <form
        onSubmit={form.onSubmit((values) => {
          download.mutate(values);
        })}>
        <Stack gap="md">
          <TextInput
            rightSection={
              <ActionIcon disabled={getClipboard.isPending} onClick={() => getClipboard.mutate()}>
                <IconClipboard />
              </ActionIcon>
            }
            disabled={getClipboard.isPending}
            label="URL"
            placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            {...form.getInputProps("Url")}
          />
          <TextInput
            rightSection={
              <ActionIcon disabled={getOutputFolder.isPending} onClick={() => getOutputFolder.mutate()}>
                <IconFolderOpen />
              </ActionIcon>
            }
            disabled={getOutputFolder.isPending}
            label="Output Folder"
            placeholder="~"
            {...form.getInputProps("OutputFolder")}
          />
          <Button disabled={download.isPending} type="submit">
            Download
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}
