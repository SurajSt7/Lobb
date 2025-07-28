import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { ContentType } from '../utils/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScreenTypes } from '../navigation/Navigator';
import CustomCard from '../global-components/CustomCard';
import TextComponent from '../global-components/TextComponent';
import { screenHeight, screenWidth } from '../utils/Screen';

export type DetailsParams = ContentType;

type DetailsProps = NativeStackScreenProps<ScreenTypes, 'Details'>;

const Details: React.FC<DetailsProps> = props => {
  const { navigation, route } = props;
  const { logo, mainImage, subTitle, text, title, thumbNailImage } =
    route.params;

  // Simple function to go back to the home screen
  const handleCancel = () => {
    navigation.goBack();
  };

  // Had to clean up the HTML content since the API returns messy HTML
  // This extracts just the body content and removes HTML tags
  const bodyContent = text.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] || text;

  const paragraphs = bodyContent
    .split(/<\/p>/i)
    .map((p: string) => p.replace(/<[^>]+>/g, '').trim())
    .filter((p: string) => p.length > 0);

  return (
    <View style={styles.container}>
      {/* Close button positioned at top right */}
      <TouchableOpacity onPress={handleCancel} style={styles.crossButton}>
        <TextComponent text="X" size={20} fontWeight="600" />
      </TouchableOpacity>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        {/* Reusing the same card component from home screen but making it full width */}
        <CustomCard
          logo={logo}
          subtitle={subTitle}
          thumbnail={thumbNailImage}
          fullWidth={true}
          title={title}
          pressable={false} // Disabled interaction since we're already on details page
        />
        <View style={styles.titleStyles}>
          <TextComponent text={title} color="#fff" size={24} fontWeight="700" />
        </View>
        {/* Just a simple line separator */}
        <View style={styles.separator} />
        <View style={styles.detailsStyles}>
          {/* This part makes the first three words of each paragraph bold */}
          {/* Thought it would look more professional this way */}
          {paragraphs.map((para: string, index: number) => {
            const words = para.split(/\s+/);
            const firstThree = words.slice(0, 3).join(' ');
            const rest = words.slice(3).join(' ');

            return (
              <Text key={index} style={styles.paragraph}>
                <Text style={styles.boldText}>{firstThree} </Text>
                {rest}
              </Text>
            );
          })}
        </View>
        <View style={styles.center}>
          <Image
            source={{ uri: mainImage }}
            height={screenHeight / 2}
            width={screenWidth / 1.1}
            borderRadius={12}
            resizeMode="cover"
          />
        </View>
        <View style={styles.bottomSection}>
          <Image source={{ uri: logo }} style={styles.img} borderRadius={12} />
          <TextComponent text={title} />
          <TextComponent text={subTitle} />
          <TouchableOpacity style={styles.refreshStyles} activeOpacity={0.7}>
            <TextComponent
              text="REFRESH"
              color="#fff"
              fontWeight="500"
              size={12}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.shareStyles} activeOpacity={0.7}>
          <TextComponent text="Share Story" textAlign="center" />
        </TouchableOpacity>
        <View style={styles.extraSpace} />
      </ScrollView>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  crossButton: {
    position: 'absolute',
    backgroundColor: '#d3d3d3',
    right: 24,
    top: 60,
    borderRadius: 100,
    padding: 8,
    zIndex: 10,
  },
  titleStyles: {
    position: 'absolute',
    left: 20,
    top: 60,
    width: '50%',
  },
  detailsStyles: {
    padding: 16,
  },
  paragraph: {
    marginBottom: 12,
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  boldText: {
    fontWeight: 'bold',
  },
  separator: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: 'grey',
  },
  refreshStyles: {
    backgroundColor: '#004dff',
    padding: 8,
    paddingHorizontal: 10,
    borderRadius: 16,
  },
  shareStyles: {
    padding: 12,
    borderRadius: 4,
    width: '30%',
    alignSelf: 'center',
    backgroundColor: '#d3d3d3',
  },
  img: {
    width: 60,
    height: 60,
  },
  center: {
    alignItems: 'center',
  },
  bottomSection: {
    backgroundColor: '#f5f5f7',
    alignItems: 'center',
    marginVertical: 20,
    gap: 10,
    paddingVertical: 20,
  },
  extraSpace: { height: screenHeight / 20 },
});
