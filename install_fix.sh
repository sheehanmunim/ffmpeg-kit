#!/bin/bash

# FFmpeg-Kit React Native Android Fix Installation Script
# This script helps install the smart-exception-java replacement library

set -e

echo "🔧 FFmpeg-Kit React Native Android Fix Installer"
echo "================================================="

# Check if we're in the right directory
if [ ! -f "smart-exception-java/build/libs/smart-exception-java-0.2.1.jar" ]; then
    echo "❌ Error: smart-exception-java-0.2.1.jar not found!"
    echo "Please run this script from the directory containing the smart-exception-java folder."
    echo "If the JAR doesn't exist, run: cd smart-exception-java && ./gradlew build"
    exit 1
fi

# Get the target React Native project directory
if [ $# -eq 0 ]; then
    echo "📁 Please provide the path to your React Native project:"
    read -r PROJECT_PATH
else
    PROJECT_PATH=$1
fi

# Validate the project path
if [ ! -d "$PROJECT_PATH" ]; then
    echo "❌ Error: Directory $PROJECT_PATH does not exist!"
    exit 1
fi

if [ ! -f "$PROJECT_PATH/android/app/build.gradle" ]; then
    echo "❌ Error: $PROJECT_PATH doesn't appear to be a React Native project (missing android/app/build.gradle)"
    exit 1
fi

echo "✅ Target project: $PROJECT_PATH"

# Create libs directory
LIBS_DIR="$PROJECT_PATH/android/app/libs"
mkdir -p "$LIBS_DIR"
echo "📁 Created/verified libs directory: $LIBS_DIR"

# Copy the JAR file
cp "smart-exception-java/build/libs/smart-exception-java-0.2.1.jar" "$LIBS_DIR/"
echo "📦 Copied smart-exception-java-0.2.1.jar to $LIBS_DIR"

# Check if build.gradle already has the dependency
BUILD_GRADLE="$PROJECT_PATH/android/app/build.gradle"
if grep -q "smart-exception-java" "$BUILD_GRADLE"; then
    echo "ℹ️  Dependency already exists in build.gradle"
else
    echo "📝 You need to manually add the following to your android/app/build.gradle dependencies section:"
    echo ""
    echo "    implementation files('libs/smart-exception-java-0.2.1.jar')"
    echo ""
    echo "And ensure you have a flatDir repository in the android section:"
    echo ""
    echo "    android {"
    echo "        repositories {"
    echo "            flatDir {"
    echo "                dirs 'libs'"
    echo "            }"
    echo "        }"
    echo "    }"
    echo ""
fi

echo "🎉 Installation complete!"
echo ""
echo "Next steps:"
echo "1. Add the dependency to your android/app/build.gradle (see above)"
echo "2. Clean your project: cd $PROJECT_PATH/android && ./gradlew clean"
echo "3. Rebuild your project: npx react-native run-android"
echo ""
echo "For detailed instructions, see: FFMPEG_KIT_ANDROID_FIX.md" 