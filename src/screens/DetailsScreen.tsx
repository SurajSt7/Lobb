import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ContentType } from '../utils/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScreenTypes } from '../navigation/Navigator';

export type DetailsParams = Partial<Omit<ContentType, 'title' | 'subtitle'>>;

type DetailsProps = NativeStackScreenProps<ScreenTypes, 'Details'>;

const Details: React.FC<DetailsProps> = props => {
  const { navigation, route } = props;
  const { id, logo, mainImage, subTitle, text, thumbNailImage, userName } =
    route.params;
  return (
    <View>
      <Text>DetailsScreen</Text>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({});
