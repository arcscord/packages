import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
  "./packages/better_error/vitest.config.mts",
  "./packages/error/vitest.config.mts",
]);
