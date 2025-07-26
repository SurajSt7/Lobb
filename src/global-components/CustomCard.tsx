import { StyleSheet, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import React from 'react';
import { screenHeight, screenWidth } from '../utils/Screen';
import TextComponent from './TextComponent';

type CustomCardType = {
  thumbnail: string;
  title: string;
  subtitle: string;
  logo: string;
  onRefreshPress: () => void;
  onPress: () => void;
};

const FALLBACK_IMG =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk0X5YB3ZSGWVqEvI-Eob6iXpcrgZjsKbZnQ&s';

const CustomCard: React.FC<CustomCardType> = props => {
  return (
    <View style={styles.imageContainer}>
      <FastImage
        source={{
          uri: props.thumbnail || FALLBACK_IMG,
          cache: FastImage.cacheControl.immutable,
          priority: FastImage.priority.high,
        }}
        style={styles.thumbnailStyles}
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
        <TouchableOpacity
          style={styles.refreshStyles}
          activeOpacity={0.7}
          hitSlop={styles.cornerPress}
          pressRetentionOffset={styles.cornerPress}
          onPress={props.onRefreshPress}
        >
          <TextComponent text="REFRESH" size={12} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomCard;

const styles = StyleSheet.create({
  imageContainer: {
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowOffset: {
      height: 6,
      width: 5,
    },
    shadowColor: '#5c5c5c75',
    shadowOpacity: 0.6,
    elevation: 4,
  },
  thumbnailStyles: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    height: screenHeight / 2,
    width: screenWidth / 1.1,
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
  refreshStyles: {},
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
