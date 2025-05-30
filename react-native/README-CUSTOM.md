# FFmpeg Kit React Native (Custom Build)

This is a custom build of FFmpeg Kit for React Native that includes pre-compiled native binaries. Since the original FFmpeg Kit project has been archived, this fork provides a working solution for React Native projects.

## What's Included

- **Native FFmpeg libraries** for Android (arm64-v8a, armeabi-v7a, x86, x86_64)
- **Core FFmpeg libraries**: libavcodec, libavformat, libavfilter, libavdevice, libavutil, libswresample, libswscale
- **Java/JavaScript wrapper** for React Native integration

## Installation

```bash
npm install github:sheehanmunim/ffmpeg-kit-react-native
```

Or in your package.json:

```json
{
  "dependencies": {
    "ffmpeg-kit-react-native": "github:sheehanmunim/ffmpeg-kit-react-native"
  }
}
```

## Usage

The API is identical to the original FFmpeg Kit:

```javascript
import { FFmpegKit, ReturnCode } from 'ffmpeg-kit-react-native';

// Execute FFmpeg command
FFmpegKit.execute('-i input.mp4 -c:v mpeg4 output.mp4').then(async (session) => {
  const returnCode = await session.getReturnCode();
  
  if (ReturnCode.isSuccess(returnCode)) {
    console.log('FFmpeg command executed successfully');
  } else {
    console.log('FFmpeg command failed');
  }
});
```

## Build Information

- **FFmpeg Version**: 6.0
- **Build Date**: Built from source
- **Architecture Support**: ARM64, ARMv7, x86, x86_64
- **External Libraries**: Basic build (no external libraries like gnutls, gmp)

## Limitations

- This build only includes the core FFmpeg libraries
- No external libraries (gnutls, gmp, etc.) are included
- iOS binaries are not included in this build

## Building from Source

If you want to rebuild the binaries:

1. Clone this repository
2. Set up Android SDK and NDK (version 26.x recommended)
3. Run the build script:

```bash
export ANDROID_SDK_ROOT=/path/to/android/sdk
export ANDROID_NDK_ROOT=/path/to/android/ndk
./android.sh
```

## License

This project maintains the original LGPL-3.0 license from FFmpeg Kit.

## Acknowledgments

Based on the original FFmpeg Kit by ARTHENICA (https://github.com/arthenica/ffmpeg-kit) 