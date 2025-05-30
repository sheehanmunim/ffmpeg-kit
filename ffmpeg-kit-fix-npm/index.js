/**
 * FFmpeg-Kit React Native Fix
 *
 * This package automatically fixes the Android build issues with ffmpeg-kit-react-native
 * caused by the missing smart-exception-java dependency.
 */

module.exports = {
  name: "ffmpeg-kit-react-native-fix",
  version: "1.0.0",
  description: "Automatic fix for ffmpeg-kit-react-native Android build issues",

  /**
   * Check if the fix has been applied to a project
   * @param {string} projectPath - Path to the React Native project
   * @returns {boolean} - True if fix is already applied
   */
  isFixApplied: function (projectPath) {
    const fs = require("fs");
    const path = require("path");

    const libsPath = path.join(
      projectPath,
      "android",
      "app",
      "libs",
      "smart-exception-java-0.2.1.jar"
    );
    const buildGradlePath = path.join(
      projectPath,
      "android",
      "app",
      "build.gradle"
    );

    if (fs.existsSync(libsPath) && fs.existsSync(buildGradlePath)) {
      const buildGradleContent = fs.readFileSync(buildGradlePath, "utf8");
      return buildGradleContent.includes("smart-exception-java");
    }

    return false;
  },

  /**
   * Apply the fix manually to a specific project
   * @param {string} projectPath - Path to the React Native project
   */
  applyFix: function (projectPath) {
    // Re-use the postinstall logic
    const originalCwd = process.cwd();
    process.chdir(projectPath);

    try {
      require("./postinstall.js");
    } finally {
      process.chdir(originalCwd);
    }
  },
};
