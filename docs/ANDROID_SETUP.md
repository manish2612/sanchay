# Android Development Setup Guide (Mac Apple Silicon / M-Series)

This guide outlines the steps to set up the Android development environment on a Mac with Apple Silicon (M1/M2/M3/M4 chips) for the Sanchay ERP Mobile App.

## 1. Install Java Development Kit (JDK)

React Native requires a specific version of the JDK (currently JDK 17 is recommended). We recommend using **Azul Zulu** builds, which support Apple Silicon natively.

### Option A: Via Homebrew (Recommended)

1.  Open your terminal.
2.  Install Homebrew if you haven't already (https://brew.sh/).
3.  Run the following commands:

    ```bash
    brew tap homebrew/cask-versions
    brew install --cask zulu@17
    ```

3.  Verify installation:

    ```bash
    java -version
    ```
    *Output should mention "Zulu17" or similar.*

### Option B: Direct Download

Download the **.dmg** for **macOS ARM 64-bit** from the [Azul Downloads Page](https://www.azul.com/downloads/?version=java-17-lts&os=macos&architecture=arm-64-bit&package=jdk).

---

## 2. Install Android Studio

1.  Download **Android Studio** from the [official website](https://developer.android.com/studio).
    *   **Note**: Ensure you download the version specifically for "Mac with Apple chip".
2.  Open the downloaded `.dmg` file and drag Android Studio to your **Applications** folder.
3.  Launch Android Studio.
4.  Follow the **Setup Wizard**:
    *   Select "Standard" installation.
    *   This will download the latest Android SDK, Platform-Tools, and Build-Tools.

---

## 3. Configure Android SDK

### SDK Platforms & Tools

1.  Open Android Studio.
2.  Click on **More Actions** (three dots) > **SDK Manager** (or `Command + ,` to open Preferences > Languages & Frameworks > Android SDK).
3.  **SDK Platforms** Tab:
    *   Check **Android 14.0 ("UpsideDownCake")** (or the version specified in the project).
    *   Ensure **Android SDK Platform** is checked.
    *   Click "Apply" to download.
4.  **SDK Tools** Tab:
    *   Check **Android SDK Build-Tools**.
    *   Check **Android SDK Command-line Tools (latest)**.
    *   Check **Android SDK Platform-Tools**.
    *   Check **Android Emulator**.
    *   Click "Apply".

---

## 4. Set Environment Variables

You need to tell your shell where the Android SDK is located.

1.  Find your shell configuration file. on macOS, it is usually `~/.zshrc`.
2.  Add the following lines to `~/.zshrc`:

    ```zsh
    export ANDROID_HOME=$HOME/Library/Android/sdk
    export PATH=$PATH:$ANDROID_HOME/emulator
    export PATH=$PATH:$ANDROID_HOME/platform-tools
    ```

3.  **Apply the changes**:

    ```bash
    source ~/.zshrc
    ```

4.  **Verify**:

    ```bash
    adb --version
    ```
    *Should output `Android Debug Bridge version ...`*

---

## 5. Create an Android Virtual Device (AVD)

1.  Open Android Studio.
2.  Go to **More Actions** > **Virtual Device Manager**.
3.  Click **Create Device**.
4.  **Hardware**: Select a device definition (e.g., **Pixel 8**). Click "Next".
5.  **System Image**:
    *   **IMPORTANT**: Select the **ARM64-v8a** image. It might be under the **Recommended** tab or **Other Images**.
    *   Look for API Level 34 (Android 14) or similar.
    *   Click the "Download" button next to the image name if needed.
6.  **Verify Configuration**:
    *   Give your AVD a name (e.g., "Pixel_8_API_34").
    *   Click "Finish".

---

## 6. Run the Emulator

1.  In **Device Manager**, click the **Play** button next to your new device.
2.  Wait for the emulator to boot up.

Alternatively, you can run it from the terminal:

```bash
emulator -avd Pixel_8_API_34
```

---

## 7. Run the App

Once the emulator is running:

1.  Navigate to your project directory.
2.  Run the development server:
    ```bash
    pnpm dev:mobile
    ```
3.  Press `a` in the terminal to run on Android.
