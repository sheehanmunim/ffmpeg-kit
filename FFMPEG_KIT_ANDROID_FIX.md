# FFmpeg-Kit React Native Android Build Fix

This document provides a solution for the Android build failure caused by the missing `smart-exception-java` dependency in ffmpeg-kit-react-native projects.

## Problem

After arthenica's ffmpeg-kit was officially retired and archived, React Native projects using `ffmpeg-kit-react-native` started failing to build on Android with errors like:

```
error: cannot find symbol
import com.arthenica.smartexception.java.Exceptions;
                                        ^
  symbol:   class Exceptions
  location: package com.arthenica.smartexception.java
```

## Root Cause

The `ffmpeg-kit-react-native` library depends on `com.arthenica:smart-exception-java` which is no longer available because:

1. The arthenica ffmpeg-kit repository has been archived and retired
2. Maven Central no longer hosts the `smart-exception-java` artifact
3. The dependency was not bundled with ffmpeg-kit-react-native

## Solution

I've created a replacement `smart-exception-java` library that provides the essential functionality needed by ffmpeg-kit-react-native.

### What's Included

The replacement library provides:

- `Exceptions.getStackTraceString(Throwable)` - Converts exception stack traces to strings
- `Exceptions.registerRootPackage(String)` - No-op method for compatibility

### Implementation Options

Choose one of the following approaches:

#### Option 1: Use Pre-built JAR (Recommended)

1. **Copy the JAR file** to your React Native project:

   ```bash
   # From this repository
   cp smart-exception-java/build/libs/smart-exception-java-0.2.1.jar /path/to/your/react-native-project/android/app/libs/

   # Create libs directory if it doesn't exist
   mkdir -p /path/to/your/react-native-project/android/app/libs/
   ```

2. **Add the dependency** in your `android/app/build.gradle`:

   ```gradle
   dependencies {
       implementation files('libs/smart-exception-java-0.2.1.jar')
       implementation 'com.arthenica:smart-exception-java:0.2.1' // Add this line
       // ... your other dependencies
   }
   ```

3. **Ensure the libs directory** is included in your repositories in `android/app/build.gradle`:
   ```gradle
   android {
       // ... other config

       repositories {
           flatDir {
               dirs 'libs'
           }
       }
   }
   ```

#### Option 2: Add Source Code Directly

1. **Create the directory structure** in your Android project:

   ```bash
   mkdir -p android/app/src/main/java/com/arthenica/smartexception/java/
   ```

2. **Copy the source file**:
   ```bash
   cp smart-exception-java/src/main/java/com/arthenica/smartexception/java/Exceptions.java \
      /path/to/your/react-native-project/android/app/src/main/java/com/arthenica/smartexception/java/
   ```

#### Option 3: Local Maven Repository

1. **Build and publish to local Maven** (from this repository):

   ```bash
   cd smart-exception-java
   ./gradlew publishToMavenLocal
   ```

2. **Add to your project's** `android/app/build.gradle`:
   ```gradle
   dependencies {
       implementation 'com.arthenica:smart-exception-java:0.2.1'
       // ... your other dependencies
   }
   ```

### After Implementation

1. **Clean your project**:

   ```bash
   cd android
   ./gradlew clean
   ```

2. **Rebuild your project**:
   ```bash
   npx react-native run-android
   # or
   expo run:android
   ```

## Testing the Fix

After implementing the solution, verify that:

1. The Android build completes without `smart-exception-java` related errors
2. ffmpeg-kit functionality works as expected
3. Exception logging in ffmpeg-kit produces readable stack traces

## Compatibility

This replacement library is compatible with:

- ffmpeg-kit-react-native 6.0.x
- React Native 0.60+
- Android API level 16+
- Java 8 and above

## Files in This Repository

- `smart-exception-java/` - Complete replacement library
- `smart-exception-java/src/main/java/com/arthenica/smartexception/java/Exceptions.java` - Main implementation
- `smart-exception-java/build.gradle` - Build configuration
- `smart-exception-java/build/libs/smart-exception-java-0.2.1.jar` - Pre-built JAR file
- `smart-exception-java/README.md` - Detailed usage instructions

## Additional Notes

- This is a minimal implementation focused on compatibility with ffmpeg-kit-react-native
- The original smart-exception library had advanced features for stack trace shortening, but those are not required for basic ffmpeg-kit functionality
- This solution maintains the same package structure and method signatures as the original library

## License

This replacement library is provided as-is for compatibility purposes. Use at your own discretion.
