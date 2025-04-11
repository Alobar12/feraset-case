import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Image
} from 'react-native';
import { styles } from './styles';

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
