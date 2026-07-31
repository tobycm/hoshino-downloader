import {
  ActionIcon,
  Autocomplete,
  Button,
  Combobox,
  Group,
  Input,
  InputBase,
  Loader,
  Modal,
  ScrollArea,
  SegmentedControl,
  Stack,
  Switch,
  TextInput,
  useCombobox,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconClipboard, IconFolderOpen } from "@tabler/icons-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { Download, GetOutputFolder, GetSensibleDownloadFolder, GetToolPaths } from "../../wailsjs/go/main/App";
import { ClipboardGetText } from "../../wailsjs/runtime";
import { useAppState } from "../states/app";
import { audioFormats, audioQualities, videoFormats, videoQualities } from "../utils/constants";

export default function DownloadModal({ opened, onClose }: { opened: boolean; onClose: () => void }) {
  const form = useForm({
    initialValues: {
      url: "",
      outputFolder: "",

      format: "",
      quality: "5",

      downloadPlaylist: false,
      playlistRange: "",

      embedThumbnail: true,
      embedChapters: true,
      embedSubs: true,
      embedMetadata: true,

      cropSquareThumbnail: false,
    },
    validate: {
      url: isNotEmpty("URL is required"),
      outputFolder: isNotEmpty("Output folder is required"),
    },
  });

  const first = useRef(true);

  const toolPaths = useQuery({
    queryKey: ["GetToolPaths"],
    queryFn: () => GetToolPaths(),
  });

  const sensibleDownloadFolder = useQuery({
    queryKey: ["GetSensibleDownloadFolder"],
    queryFn: () => GetSensibleDownloadFolder(),
  });

  useEffect(() => {
    if (!opened) return;

    toolPaths.refetch();
    sensibleDownloadFolder.refetch();
  }, [opened]);

  useEffect(() => {
    if (!sensibleDownloadFolder.data) return;

    form.setFieldValue("outputFolder", sensibleDownloadFolder.data);
  }, [sensibleDownloadFolder.data]);

  const getOutputFolder = useMutation({
    mutationFn: GetOutputFolder,
    onSuccess: (data) => {
      form.setFieldValue("outputFolder", data);
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
      form.setFieldValue("url", url ? url : data);
    },
  });

  const url = useAppState((state) => state.url);

  useEffect(() => {
    first.current = opened;
    if (opened) {
      getClipboard.mutate();
      form.setFieldValue("url", url);
    }

    setShowMoreFormats(false);
  }, [opened]);

  const download = useMutation({
    mutationFn: async (values: typeof form.values) => {
      if (!toolPaths.data) {
        throw new Error("Tools not found");
      }

      const payload: Parameters<typeof Download>[0] = {
        Url: values.url,
        OutputFolder: values.outputFolder,

        EmbedChapters: values.embedChapters,
        EmbedThumbnail: values.embedThumbnail,
        EmbedSubs: values.embedSubs,
        EmbedMetadata: values.embedMetadata,
        CropSquareThumbnail: values.cropSquareThumbnail,

        DownloadPlaylist: values.downloadPlaylist,
        PlaylistRange: values.playlistRange,

        ExtractAudio: downloadMode === "audio",
        AudioFormat: downloadMode === "audio" ? values.format : "",
        AudioQuality: values.quality,
        RemuxVideo: downloadMode === "audio" ? "" : values.format,

        YtdlpPath: toolPaths.data.ytdlp,
        FfmpegPath: toolPaths.data.ffmpeg,
        DenoPath: toolPaths.data.deno,
      };

      console.log(values);

      const result = await Download(payload);

      console.log(result);

      return true;
    },
    onSuccess: () => {
      notifications.show({
        title: "Download Completed",
        message: "The download has been completed successfully.",
      });
    },
    onError: (error) => {
      console.error("Download failed:", error);
      notifications.show({
        title: "Download Failed",
        message: String(error),
        color: "red",
      });
    },
  });

  const [downloadMode, setDownloadMode] = useState<"both" | "audio" | "video">("both");

  const [showMoreFormats, setShowMoreFormats] = useState(false);

  let formats = downloadMode === "audio" ? audioFormats : videoFormats;
  if (!showMoreFormats) {
    if (downloadMode === "audio") {
      formats = formats.slice(0, 5);
    } else {
      formats = formats.slice(0, 3);
    }
  }

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  useEffect(() => {
    form.setFieldValue("format", formats[0]);
  }, [downloadMode, opened]);

  return (
    <Modal opened={opened} onClose={onClose} title="Download" centered>
      <form
        onSubmit={form.onSubmit((values) => {
          download.mutate(values);
        })}>
        <Stack gap="md" mih="60vh">
          <SegmentedControl
            value={downloadMode}
            onChange={setDownloadMode}
            data={[
              { label: "Video+Audio", value: "both" },
              { label: "Audio only", value: "audio" },
              { label: "Video only", value: "video" },
            ]}
          />
          <TextInput
            rightSection={
              <ActionIcon disabled={getClipboard.isPending} onClick={() => getClipboard.mutate()}>
                <IconClipboard />
              </ActionIcon>
            }
            disabled={getClipboard.isPending}
            label="URL"
            placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            {...form.getInputProps("url")}
          />

          <Group grow>
            {form.values.url.includes("?list=") && <Switch label="Download Playlist" {...form.getInputProps("downloadPlaylist")} />}
            {form.values.downloadPlaylist && <TextInput label="Playlist Range" {...form.getInputProps("playlistRange")} />}
          </Group>

          <TextInput
            rightSection={
              <ActionIcon disabled={getOutputFolder.isPending} onClick={() => getOutputFolder.mutate()}>
                <IconFolderOpen />
              </ActionIcon>
            }
            disabled={getOutputFolder.isPending}
            label="Output Folder"
            placeholder="~"
            {...form.getInputProps("outputFolder")}
          />

          <Group grow>
            <Combobox
              store={combobox}
              withinPortal={false}
              onOptionSubmit={(val) => {
                if (val === "More") {
                  setShowMoreFormats(true);
                  return;
                }
                form.setFieldValue("format", val);
                combobox.closeDropdown();
              }}>
              <Combobox.Target targetType="button">
                <InputBase
                  label="Format"
                  component="button"
                  type="button"
                  pointer
                  rightSection={<Combobox.Chevron />}
                  onClick={() => combobox.toggleDropdown()}
                  rightSectionPointerEvents="none">
                  {form.values.format || <Input.Placeholder>Pick value</Input.Placeholder>}
                </InputBase>
              </Combobox.Target>
              <Combobox.Dropdown>
                <Combobox.Options>
                  <ScrollArea h={132}>
                    {formats.map((format) => (
                      <Combobox.Option key={format} value={format}>
                        {format}
                      </Combobox.Option>
                    ))}
                    {!showMoreFormats && <Combobox.Option value="More">More</Combobox.Option>}
                  </ScrollArea>
                </Combobox.Options>
              </Combobox.Dropdown>
            </Combobox>

            <Autocomplete
              data={downloadMode === "audio" ? audioQualities : videoQualities}
              {...form.getInputProps("quality")}
              label="Quality"
              description={downloadMode === "audio" ? "0 (best) to 10 (worst)" : ""}
            />
          </Group>

          <Group w="100%" justify="space-between">
            <Switch label="Embed Chapters" {...form.getInputProps("embedChapters", { type: "checkbox" })} />
            <Switch label="Embed Thumbnails" {...form.getInputProps("embedThumbnail", { type: "checkbox" })} />
            {downloadMode !== "audio" && <Switch label="Embed Subtitles" {...form.getInputProps("embedSubs", { type: "checkbox" })} />}
            <Switch label="Embed Metadata" {...form.getInputProps("embedMetadata", { type: "checkbox" })} />
            {form.values.embedThumbnail && <Switch label="Square Thumbnail" {...form.getInputProps("cropSquareThumbnail", { type: "checkbox" })} />}
          </Group>

          <Button disabled={download.isPending} type="submit" style={{ marginTop: "auto" }}>
            {download.isPending ? <Loader size="xs" /> : "Download"}
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}
