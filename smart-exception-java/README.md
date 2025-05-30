# Smart Exception Java - Replacement Library

This is a replacement library for the deprecated `com.arthenica:smart-exception-java` dependency that was used by ffmpeg-kit-react-native.

## Background

The original FFmpegKit library from arthenica has been retired and archived. This caused build failures for React Native projects using ffmpeg-kit-react-native because the smart-exception-java dependency is no longer available.

## Solution

This replacement library provides the essential `Exceptions` class with the two methods that ffmpeg-kit requires:

- `getStackTraceString(Throwable)` - Converts exception stack traces to strings
- `registerRootPackage(String)` - No-op method for compatibility

## Usage

### Option 1: Build and Use JAR File

1. Build the library:

```bash
cd smart-exception-java
./gradlew build
```

2. Copy the generated JAR to your Android project:

```bash
cp build/libs/smart-exception-java-0.2.1.jar /path/to/your/android/app/libs/
```

3. Add the dependency in your `android/app/build.gradle`:

```gradle
dependencies {
    implementation files('libs/smart-exception-java-0.2.1.jar')
    // ... other dependencies
}
```

### Option 2: Include Source Directly

Copy the `src/main/java/com/arthenica/smartexception/java/Exceptions.java` file directly into your Android project's source directory.

### Option 3: Local Maven Repository

1. Build and publish to local Maven:

```bash
cd smart-exception-java
./gradlew publishToMavenLocal
```

2. Add to your `android/app/build.gradle`:

```gradle
dependencies {
    implementation 'com.arthenica:smart-exception-java:0.2.1'
    // ... other dependencies
}
```

## Compatibility

This replacement library is compatible with:

- ffmpeg-kit-react-native 6.0.x
- All Android API levels supported by ffmpeg-kit
- Java 8 and above

## License

This replacement library is provided as-is for compatibility purposes. Use at your own discretion.
