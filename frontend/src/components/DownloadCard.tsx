import { Group, Image, Progress, Stack, Text } from "@mantine/core";
import { main } from "../../wailsjs/go/models";
import { secondsToTime } from "../utils/time";

export default function DownloadCard({ job }: { job: main.Job }) {
  let progress = undefined;

  if (job.Progress?.downloaded_bytes && job.Progress?.total_bytes) {
    progress = (job.Progress.downloaded_bytes / job.Progress.total_bytes) * 100;
  }

  return (
    <Group w="100%" bg="gray.8" bdrs="md" h="120px" style={{ overflow: "clip" }}>
      <Image src={job.Metadata?.thumbnail} w="auto" h="100%" />
      <Stack flex={1} py="sm" gap={0} justify="space-between">
        <Text fz="xl" ta="left">
          {job.Metadata?.title}
        </Text>
        <Text fz="sm" ta="left">
          {job.Metadata?.channel} {job.Metadata?.duration && `• ${secondsToTime(job.Metadata?.duration)}`}
        </Text>
        <Text fz="sm" ta="left">
          Download from {job.Options?.Url}
        </Text>

        <Group flex={1} justify="center">
          {progress !== undefined && (
            <Progress
              flex={1}
              animated={job.Progress?.status === "post_processing"}
              value={progress}
              color={job.Progress?.status === "error" ? "red" : job.Progress?.status === "finished" ? "green" : ""}
            />
          )}
          {job.Progress?.status === "downloading" && (
            <Text mx="md">Downloaded {progress !== undefined ? `${progress.toFixed(2)}%` : job.Progress?.downloaded_bytes}</Text>
          )}
          {job.Progress?.status === "post_processing" && <Text mx="md">Post-processing</Text>}
          {job.Progress?.status === "finished" && <Text mr="md">Completed</Text>}
          {job.Progress?.status === "error" && <Text mx="md">Errored</Text>}
        </Group>
      </Stack>
    </Group>
  );
}
