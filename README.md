# Expo Alternate Icons

<p align="center"><a href="https://getclave.com"><img width="1000" src='https://i.imgur.com/utPOhmS.png'/></a></p>

Fork of [ExpoAlternateAppIcons](https://github.com/pchalupa/expo-alternate-app-icons) package, adapted for Clave monorepo.

Alternate App Icons is a library that allows you to easily switch between different app icons in your Expo project.

### Platform Compatibility

| Android Device | Android Emulator | iOS Device | iOS Simulator | Web |
| -------------- | ---------------- | ---------- | ------------- | --- |
| ✅             | ✅               | ✅         | ✅            | ❌  |

## Introduction

Customizing app icons can be a valuable way to provide users with a personalized experience for your app. This library simplifies the process of implementing alternate app icons in your Expo project.

## Installation

To get started, install the library using Expo CLI:

```sh
npx expo install @getclave/expo-alternate-icons
```

> Ensure your project is running Expo SDK 51+.

## How To Use

This package contains an Expo Plugin that copies your alternative icons to native projects.

1. Add `@getclave/expo-alternate-icons` to the plugins array inside your [app.json](https://docs.expo.dev/versions/latest/config/app/).
2. The second item in the array accepts an array with details about your alternate icons.
3. [Prebuild](https://docs.expo.dev/workflow/prebuild/) a project using `npx expo prebuild --clean` to apply the plugin changes.

```json
// app.json or app.config.js
{
    // ...
    "plugins": [
        // ...
        [
            "@getclave/expo-alternate-icons",
            [
                {
                    "name": "IconA", // The name of the alternate icon
                    "ios": {
                        // Path to the iOS app icons or if you do not want to use the variants enter directly the path
                        "light": "./assets/icon-a.png",
                        "dark": "./assets/icon-a-dark.png",
                        "tinted": "./assets/icon-a-tinted.png"
                    },
                    "android": {
                        "foregroundImage": "./assets/icon-a-foreground.png", // Path to Android foreground image
                        "backgroundColor": "#001413" // Background color for Android adaptive icon
                    }
                },
                {
                    "name": "IconB",
                    "ios": "./assets/icon-b.png", // Without variants,
                    "android": {
                        "foregroundImage": "./assets/icon-b-foreground.png",
                        "backgroundColor": "#001413"
                    }
                },
                {
                    "name": "IconC"
                    // ...
                }
            ]
        ]
    ]
}
```

### Icons

Your icons should follow the same format as your [default app icon](https://docs.expo.dev/develop/user-interface/splash-screen-and-app-icon/#export-the-icon-image-as-a-png).

- Use a **.png** file
- Square format with resolution **1024x1024 px**
- iOS
    - Without transparency layer
- Android - Adaptive icon
    - Foreground image
    - Background fill color

### API Documentation

#### Supports Alternate Icons

A boolean value indicating whether the current device supports alternate app icons.

```ts
const supportsAlternateIcons: boolean;
```

#### Set Alternate App Icon

To set app icon to **IconA**, use `setIcon("IconA")`. This function takes icon name as argument.

To reset the app icon to the default pass `null` like `setIcon(null)`.

```ts
function setIcon(name: string | null): Promise<string | null>;
```

#### Get App Icon Name

Retrieves the name of the currently active app icon.

```ts
function getIconName(): string | null;
```

#### Reset App Icon

Reset app icon to the default one.

> This is just a shortcut for `setIcon(null)`.

```ts
function resetIcon(): Promise<void>;
```

## Development

### Expo Config Plugin

```shell
npm run build plugin # Start build on save
cd example && npx expo prebuild # Execute the config plugin
```
