import { Button, Stack, Text } from "@mantine/core";

import { InstallFfmpeg } from "../wailsjs/go/main/App";

function App() {
  return (
    <Stack h="100vh" justify="center" align="center">
      <Text>Nice</Text>

      <Button onClick={async () => console.log(await InstallFfmpeg())}>Install FFMPEG</Button>
    </Stack>
  );
}

export default App;
