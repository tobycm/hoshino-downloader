import { Button, Stack, TextInput } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Test } from "../../wailsjs/go/main/App";

export default function TestForm({ onTestComplete }: { onTestComplete?: (data: any) => void }) {
  const [url, setUrl] = useState("");

  const test = useMutation({
    mutationFn: async (url: string) => {
      return Test(url);
    },
    onSuccess(data) {
      onTestComplete?.(data);
    },
  });

  return (
    <Stack>
      <TextInput value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Enter URL" />
      <Button
        onClick={() => {
          test.mutate(url);
        }}>
        Test
      </Button>
    </Stack>
  );
}
