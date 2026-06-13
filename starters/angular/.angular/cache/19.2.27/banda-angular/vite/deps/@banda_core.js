import "./chunk-XWLXMCJQ.js";

// ../../packages/banda-core/dist/theme.js
var DEFAULT_PREFERENCE = "system";
function resolveTheme(preference, systemPrefersDark) {
  if (preference === "system") {
    return systemPrefersDark ? "dark" : "light";
  }
  return preference;
}
function isThemePreference(value) {
  return value === "light" || value === "dark" || value === "system";
}

// ../../packages/banda-core/dist/notification.js
var DEFAULT_DURATION_MS = 5e3;
var counter = 0;
function createNotification(input) {
  counter += 1;
  return {
    id: `notification-${counter}`,
    message: input.message,
    variant: input.variant ?? "info",
    durationMs: input.durationMs === void 0 ? DEFAULT_DURATION_MS : input.durationMs
  };
}
export {
  DEFAULT_PREFERENCE,
  createNotification,
  isThemePreference,
  resolveTheme
};
//# sourceMappingURL=@banda_core.js.map
