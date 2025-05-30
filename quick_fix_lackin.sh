#!/bin/bash

# Quick fix script for LackinReact project
echo "🚀 Applying zero-config fix to LackinReact project..."

PROJECT_PATH="/Users/sheehanmunim/LackinReact"
BUILD_GRADLE="$PROJECT_PATH/android/app/build.gradle"

# Check if project exists
if [ ! -f "$BUILD_GRADLE" ]; then
    echo "❌ LackinReact project not found at $PROJECT_PATH"
    exit 1
fi

echo "📁 Found project at $PROJECT_PATH"

# Check if dependency is already added
if grep -q "smart-exception-java" "$BUILD_GRADLE"; then
    echo "ℹ️  Dependency already exists in build.gradle"
else
    echo "📝 Adding smart-exception-java dependency..."
    
    # Add the dependency to the dependencies block
    sed -i '' '/dependencies {/a\
    implementation '\''com.arthenica:smart-exception-java:0.2.1'\''
' "$BUILD_GRADLE"
    
    echo "✅ Added dependency to build.gradle"
fi

echo "🧹 Cleaning project..."
cd "$PROJECT_PATH/android"
./gradlew clean

echo "🎉 Fix applied successfully!"
echo ""
echo "Now you can run:"
echo "cd $PROJECT_PATH"
echo "npx expo run:android" 