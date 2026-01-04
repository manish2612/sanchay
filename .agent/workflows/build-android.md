---
description: Build and install APK on local Android device
---
# Build and Install on Android

This workflow guides you through enabling USB debugging and running the app on your physical Android device.

## Prerequisites
1.  **Android Studio** installed and setup (Android SDK, platform-tools).
2.  **Java/JDK** installed (Java 17 recommended for React Native).
3.  **USB Cable** to connect Pixel 8 to Mac.

## Step 1: Enable Developer Mode on Pixel 8
1.  Go to **Settings** > **About phone**.
2.  Scroll down to **Build number**.
3.  Tap **Build number** 7 times until you see "You are now a developer!".
4.  Go back to **Settings** > **System** > **Developer options**.
5.  Enable **USB debugging**.

## Step 2: Connect Device
1.  Connect Pixel 8 to your Mac via USB.
2.  On the phone, authorize the computer if prompted ("Allow USB debugging?").
3.  Verify connection by running:
    ```bash
    adb devices
    ```
    You should see your device ID in the list.

## Step 3: Build and Run
Run the following command in `apps/mobile`:

```bash
npx expo run:android --device
```

- This command will:
    1.  Prebuild the project (generate `android` folder).
    2.  Use Gradle to build the debug APK.
    3.  Install it on the connected device.
    4.  Start the dev server.

## Troubleshooting
- **"SDK location not found"**: Set `ANDROID_HOME` environment variable.
  ```bash
  export ANDROID_HOME=$HOME/Library/Android/sdk
  export PATH=$PATH:$ANDROID_HOME/platform-tools
  ```
- **"React version mismatch"**: If the build fails due to dependency conflicts, ensure `package.json` matches Expo version requirements.
