#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

console.log("🔧 FFmpeg-Kit React Native Fix - Auto-applying fix...");

// Find the project root (where package.json is)
let projectRoot = process.cwd();
while (
  projectRoot !== "/" &&
  !fs.existsSync(path.join(projectRoot, "package.json"))
) {
  projectRoot = path.dirname(projectRoot);
}

if (projectRoot === "/") {
  console.log("❌ Could not find React Native project root");
  process.exit(1);
}

console.log(`📁 Project root: ${projectRoot}`);

// Check if this is a React Native project
const packageJsonPath = path.join(projectRoot, "package.json");
const androidPath = path.join(projectRoot, "android", "app", "build.gradle");

if (!fs.existsSync(packageJsonPath) || !fs.existsSync(androidPath)) {
  console.log(
    "ℹ️  Not a React Native project or Android not configured - skipping"
  );
  process.exit(0);
}

try {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

  // Check if ffmpeg-kit-react-native is a dependency
  const hasFFmpegKit =
    packageJson.dependencies &&
    packageJson.dependencies["ffmpeg-kit-react-native"];

  if (!hasFFmpegKit) {
    console.log(
      "ℹ️  ffmpeg-kit-react-native not found in dependencies - skipping"
    );
    process.exit(0);
  }

  console.log("✅ ffmpeg-kit-react-native detected - applying fix...");

  // Create android/app/libs directory
  const libsDir = path.join(projectRoot, "android", "app", "libs");
  if (!fs.existsSync(libsDir)) {
    fs.mkdirSync(libsDir, { recursive: true });
    console.log(`📁 Created libs directory: ${libsDir}`);
  }

  // Copy the smart-exception-java JAR file
  const sourceJar = path.join(__dirname, "smart-exception-java.jar");
  const targetJar = path.join(libsDir, "smart-exception-java-0.2.1.jar");

  if (fs.existsSync(sourceJar)) {
    fs.copyFileSync(sourceJar, targetJar);
    console.log(`📦 Copied smart-exception-java JAR to ${targetJar}`);
  } else {
    console.log("⚠️  JAR file not found, creating source file instead...");

    // Create the source directory and file
    const sourceDir = path.join(
      projectRoot,
      "android",
      "app",
      "src",
      "main",
      "java",
      "com",
      "arthenica",
      "smartexception",
      "java"
    );
    fs.mkdirSync(sourceDir, { recursive: true });

    const sourceFile = path.join(__dirname, "Exceptions.java");
    const targetFile = path.join(sourceDir, "Exceptions.java");

    if (fs.existsSync(sourceFile)) {
      fs.copyFileSync(sourceFile, targetFile);
      console.log(`📝 Created Exceptions.java at ${targetFile}`);
    }
  }

  // Modify build.gradle to include the dependency
  const buildGradlePath = path.join(
    projectRoot,
    "android",
    "app",
    "build.gradle"
  );
  let buildGradleContent = fs.readFileSync(buildGradlePath, "utf8");

  // Check if dependency is already added
  if (!buildGradleContent.includes("smart-exception-java")) {
    // Add the dependency
    const dependenciesMatch = buildGradleContent.match(
      /dependencies\s*\{[^}]*\}/s
    );
    if (dependenciesMatch) {
      const dependenciesBlock = dependenciesMatch[0];
      const newDependency =
        "    implementation files('libs/smart-exception-java-0.2.1.jar')\n";
      const updatedDependencies = dependenciesBlock.replace(
        /dependencies\s*\{/,
        `dependencies {\n${newDependency}`
      );
      buildGradleContent = buildGradleContent.replace(
        dependenciesBlock,
        updatedDependencies
      );

      fs.writeFileSync(buildGradlePath, buildGradleContent);
      console.log("📝 Added smart-exception-java dependency to build.gradle");
    }
  } else {
    console.log("ℹ️  Dependency already exists in build.gradle");
  }

  // Ensure flatDir repository is configured
  if (!buildGradleContent.includes("flatDir")) {
    // Add flatDir repository
    const androidMatch = buildGradleContent.match(/android\s*\{/);
    if (androidMatch) {
      const repositoriesConfig = `
    repositories {
        flatDir {
            dirs 'libs'
        }
    }
`;
      buildGradleContent = buildGradleContent.replace(
        /android\s*\{/,
        `android {\n${repositoriesConfig}`
      );
      fs.writeFileSync(buildGradlePath, buildGradleContent);
      console.log("📝 Added flatDir repository configuration");
    }
  }

  console.log("🎉 FFmpeg-Kit fix applied successfully!");
  console.log("");
  console.log("Next steps:");
  console.log("1. Clean your project: cd android && ./gradlew clean");
  console.log("2. Run your project: npx expo run:android");
} catch (error) {
  console.error("❌ Error applying fix:", error.message);
  process.exit(1);
}
