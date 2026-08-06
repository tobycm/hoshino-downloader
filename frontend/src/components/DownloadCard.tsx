import { Card, Image, Progress, Stack, Text } from "@mantine/core";
import { main } from "../../wailsjs/go/models";
import { secondsToTime } from "../utils/time";

export default function DownloadCard({ job }: { job: main.Job }) {
  let progress = undefined;

  if (job.Progress?.downloaded_bytes && job.Progress?.total_bytes) {
    progress = (job.Progress.downloaded_bytes / job.Progress.total_bytes) * 100;
  }

  return (
    <Card w={400}>
      <Card.Section>
        <Image src={job.Progress?.info?.thumbnail} w="100%" h="auto" style={{ aspectRatio: 1 }} />
      </Card.Section>
      <Stack gap={0}>
        <Text fz="xl" fw={900} ta="left" lineClamp={2}>
          {job.Progress?.info?.playlist_title && `${job.Progress?.info?.playlist_title} - `} {job.Progress?.info?.title}
        </Text>
        <Text fz="sm" ta="left">
          {job.Progress?.info?.channel || job.Progress?.info?.uploader}{" "}
          {job.Progress?.info?.duration && `• ${secondsToTime(job.Progress?.info?.duration)}`}{" "}
          {job.Progress?.info?.playlist_index && `#${job.Progress?.info?.playlist_index}`}
        </Text>
        <Text fz="sm" ta="left" lineClamp={1}>
          Download from <a href={job.Options?.Url}>{job.Options?.Url}</a>
        </Text>
      </Stack>
      <Stack flex={1} justify="center" mt="md">
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
      </Stack>
    </Card>
  );
}
