import { StyleSheet, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import React from 'react';
import { screenHeight, screenWidth } from '../utils/Screen';
import TextComponent from './TextComponent';

export type CustomCardType = {
  thumbnail: string;
  title: string;
  subtitle: string;
  logo: string;
  onRefreshPress?: () => void;
  onPress?: () => void;
  fullWidth?: boolean;
  pressable?: boolean;
};

const FALLBACK_IMG =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk0X5YB3ZSGWVqEvI-Eob6iXpcrgZjsKbZnQ&s';

const CustomCard: React.FC<CustomCardType> = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      activeOpacity={props.pressable ? 0.8 : 1}
      style={[styles.imageContainer, props.pressable && styles.pressableStyles]}
    >
      <FastImage
        source={{
          uri: props.thumbnail || FALLBACK_IMG,
          cache: FastImage.cacheControl.immutable,
          priority: FastImage.priority.high,
        }}
        style={[
          styles.thumbnailStyles,
          {
            width: props.fullWidth ? '100%' : screenWidth / 1.1,
          },
        ]}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={styles.cardBottom}>
        <View style={styles.leftPart}>
          <View style={styles.logoContainer}>
            <FastImage
              source={{
                uri: props.logo,
                priority: FastImage.priority.normal,
                cache: FastImage.cacheControl.immutable,
              }}
              style={styles.logoStyles}
            />
          </View>
          <View style={styles.gap}>
            <TextComponent text={props.title} fontWeight="500" />
            <TextComponent text={props.subtitle} size={12} />
          </View>
        </View>
        {props.pressable && (
          <TouchableOpacity
            style={styles.refreshStyles}
            activeOpacity={0.7}
            hitSlop={styles.cornerPress}
            pressRetentionOffset={styles.cornerPress}
            onPress={props.onRefreshPress}
          >
            <TextComponent
              text="REFRESH"
              color="blue"
              fontWeight="500"
              size={12}
            />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(CustomCard);

const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: '#fff',
  },
  pressableStyles: {
    shadowOffset: {
      height: 6,
      width: 5,
    },
    shadowColor: '#5c5c5c75',
    shadowOpacity: 0.6,
    elevation: 6,
    borderRadius: 20,
  },
  thumbnailStyles: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    height: screenHeight / 2.5,
  },
  leftPart: {
    alignItems: 'center',
    width: '60%',
    flexDirection: 'row',
    gap: 12,
  },
  cardBottom: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  refreshStyles: {
    backgroundColor: '#C0C0C0',
    padding: 6,
    borderRadius: 16,
  },
  logoStyles: {
    borderRadius: 8,
    height: screenHeight / 25,
    width: screenWidth / 11.5,
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profile: {
    backgroundColor: '#D3D3D3',
    borderRadius: 100,
    padding: 8,
  },
  header: {
    width: '100%',
    paddingHorizontal: 16,
    marginVertical: 6,
  },
  logoContainer: {
    backgroundColor: '#000',
    padding: 2,
    borderRadius: 12,
  },
  gap: { gap: 4 },
  cornerPress: {
    top: 15,
    bottom: 15,
    left: 15,
    right: 15,
  },
});
