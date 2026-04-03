import type { Config } from "@react-router/dev/config";

export default {
  // ssr: true is the default
  ssr: true,
  // tell react-router where our source files are
  appDirectory: "src",
} satisfies Config;
