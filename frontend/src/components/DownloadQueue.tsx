import { Group } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { GetJobs } from "../../wailsjs/go/main/App";
import DownloadCard from "./DownloadCard";

export default function DownloadQueue() {
  const jobs = useQuery({
    queryKey: ["GetJobs"],
    queryFn: GetJobs,
    refetchInterval: 100,
  });

  return (
    <Group w="80%">
      {jobs.data?.map((job) => (
        <DownloadCard job={job} />
      ))}
    </Group>
  );
}
