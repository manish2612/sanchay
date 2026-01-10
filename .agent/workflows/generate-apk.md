---
description: Build a standalone APK file to share
---
# Generate APK File

Follow these steps to generate an APK file that you can email or share.

## Step 1: Generate Native Android Project
If you haven't already, run this in `apps/mobile`:
```bash
npx expo prebuild -p android
```

## Step 2: Build the APK
1.  Navigate to the android folder:
    ```bash
    cd android
    ```
2.  Build the Debug APK (easiest, no signing required):
    ```bash
    ./gradlew assembleDebug
    ```

## Step 3: Locate the File
After the build completes successfully, the APK will be located at:
`apps/mobile/android/app/build/outputs/apk/debug/app-debug.apk`

## Step 4: Share
You can now email this file to yourself.
**Note**: When installing on your Pixel 8, you may need to allow "Install from unknown sources".

## Option 2: Release APK (Optimized, ~28MB)
For a smaller distribution file (e.g. for email):
1.  **Configure Optimization**:
    - In `apps/mobile/android/gradle.properties`: `android.enableMinifyInReleaseBuilds=true`, `android.enableShrinkResourcesInReleaseBuilds=true`.
    - In `apps/mobile/android/app/build.gradle`: `def enableSeparateBuildPerCPUArchitecture = true` (to split APKs).
2.  **Build**:
    ```bash
    ./gradlew assembleRelease
    ```
    *(Note: This uses the debug keystore by default for local testing, which is fine for personal use).*

## Step 3: Locate the File
- **Debug**: `apps/mobile/android/app/build/outputs/apk/debug/app-debug.apk`
- **Release (Pixel 8 / Most Modern Phones)**:
  `apps/mobile/android/app/build/outputs/apk/release/app-arm64-v8a-release.apk`
