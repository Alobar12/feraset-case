import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Image
} from 'react-native';
import { styles } from './styles';

/**
 * Chip Component
 * A customizable component that displays an icon (or loading indicator) along with a title and content.
 * It also supports error states and custom click actions.
 * 
 * @example
 * <Chip
 *   title="Success"
 *   content="Your operation was successful"
 *   backgroundColor="#28a745"
 *   contentColor="#fff"
 *   icon={iconSource}
 *   iconBackgroundColor="#6c757d"
 *   onPress={handleChipPress}
 *   status="processing"
 *   errorIcon={errorIconSource}
 * />
 * 
 * @param {string} title - The title displayed on the chip.
 * @param {string} content - The content text displayed on the chip.
 * @param {string} backgroundColor - The background color for the chip container.
 * @param {string} contentColor - The color of the content text.
 * @param {any} [icon] - The icon to be displayed inside the chip. Can be any source of an image or icon.
 * @param {string} [iconBackgroundColor] - The background color for the icon container.
 * @param {Function} [onPress] - An optional function that gets triggered when the chip is pressed.
 * @param {string} [status] - The status of the chip, which can be 'processing' (for loading state) or 'error' (for error state).
 * @param {any} [errorIcon] - The icon to be displayed in case of an error. It replaces the main icon when the status is 'error'.
 */

interface ChipProps {
  title: string;
  content: string;
  backgroundColor: string;
  contentColor: string;
  icon?: any;
  iconBackgroundColor?: string;
  onPress?: () => void;
  status?: string;
  errorIcon?: any;
}

const Chip = ({
  title,
  content,
  backgroundColor,
  contentColor,
  icon,
  iconBackgroundColor,
  onPress,
  status,
  errorIcon
}: ChipProps) => {
  return (
    <TouchableOpacity style={[styles.container]} onPress={onPress}>
      <View
        style={[
          {
            backgroundColor: iconBackgroundColor
          },
          status === 'processing' && styles.processing,
          styles.wrapper
        ]}
      >
        {icon ? (
          <View>
            <Image
              resizeMode='contain'
              source={icon}
              style={[styles.iconContainer]}
            />
            {status === 'error' && (
              <View
                style={[
                  styles.iconWrapper,
                  {
                    backgroundColor: iconBackgroundColor
                  }
                ]}
              >
                <Image source={errorIcon} style={styles.icon} />
              </View>
            )}
          </View>
        ) : (
          <ActivityIndicator style={styles.indicator} color='#fff' />
        )}
      </View>
      <View
        style={[styles.textContainer, { backgroundColor: backgroundColor }]}
      >
        <Text style={[styles.title]}>{title}</Text>
        <Text style={[styles.content, { color: contentColor }]}>{content}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Chip;
