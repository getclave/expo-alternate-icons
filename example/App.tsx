import {
    setIcon,
    resetIcon,
    getIconName,
    supportsAlternateIcons,
    type AlternateIcons,
} from '@getclave/expo-alternate-icons';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';
import { Text, View, SafeAreaView, Alert } from 'react-native';

import { icons } from './App.preset';
import { styles } from './App.styles';
import { Button } from './src/Button';
import { IconButton } from './src/IconButton';

export default function App() {
    const [currentAppIconName, setCurrentAppIconName] = useState<string | null>(
        getIconName(),
    );

    const handleSetAppIcon = useCallback(
        async (iconName: AlternateIcons) => {
            try {
                const newAppIconName = await setIcon(iconName);

                setCurrentAppIconName(newAppIconName);
            } catch (error) {
                if (error instanceof Error) Alert.alert('Error', error.message);
            }
        },
        [setCurrentAppIconName],
    );

    const handleReset = useCallback(async () => {
        try {
            await resetIcon();

            setCurrentAppIconName(null);
        } catch (error) {
            if (error instanceof Error) Alert.alert('Error', error.message);
        }
    }, [setCurrentAppIconName]);

    useEffect(() => {
        setCurrentAppIconName(getIconName());
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" />
            <View style={styles.wrapper}>
                <Text style={[styles.text, styles.title]}>
                    Pick Home Screen Icon
                </Text>
                <Text style={styles.text}>
                    {`This device ${
                        supportsAlternateIcons ? 'supports' : 'does not support'
                    } alternate app icons`}
                </Text>
                <View style={styles.iconsPicker}>
                    {icons.map(([name, path]) => (
                        <IconButton
                            key={name}
                            name={name}
                            source={path}
                            onPress={handleSetAppIcon}
                            selected={currentAppIconName === name}
                        />
                    ))}
                </View>
                <Button onPress={handleReset}>Reset</Button>
            </View>
        </SafeAreaView>
    );
}
