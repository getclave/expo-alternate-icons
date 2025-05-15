import { useCallback } from 'react';
import { Image, type ImageRequireSource, TouchableOpacity } from 'react-native';

import { styles } from './IconButton.styles';
import { AlternateIcons } from '@getclave/expo-alternate-icons/types';

interface IconButtonProps {
    source: ImageRequireSource;
    name: AlternateIcons;
    onPress: (name: AlternateIcons) => void;
    selected: boolean;
}

export const IconButton = ({
    source,
    name,
    onPress,
    selected,
}: IconButtonProps) => {
    const handlePress = useCallback(() => onPress(name), [onPress]);

    return (
        <TouchableOpacity
            style={[styles.container, selected && styles.selected]}
            onPress={handlePress}
            disabled={selected}
        >
            <Image source={source} style={styles.icon} resizeMode="cover" />
        </TouchableOpacity>
    );
};
