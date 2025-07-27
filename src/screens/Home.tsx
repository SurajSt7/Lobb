import { StyleSheet, View, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import ViewComponent from '../global-components/ViewComponent';
import TextComponent from '../global-components/TextComponent';
import { generateToken } from '../api/createToken';
import { getDetails } from '../api/getDetails';
import { ContentType } from '../utils/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScreenTypes } from '../navigation/Navigator';
import CustomCard from '../global-components/CustomCard';

type HomeProps = NativeStackScreenProps<ScreenTypes, 'Home'>;

const Home: React.FC<HomeProps> = props => {
  const { navigation, route } = props;

  const [data, setData] = useState<ContentType>();
  const [loading, setLoading] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const today = new Date();

  const weekday = today
    .toLocaleDateString('en-US', { weekday: 'long' })
    .toUpperCase();

  const day = today.getDate();

  const month = today
    .toLocaleDateString('en-US', { month: 'long' })
    .toUpperCase();

  const formatted = `${weekday} ${day} ${month}`;

  console.log(formatted);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const token = await generateToken();
        const data = await getDetails(token);
        setLoading(false);
        setData(data);
        console.log('data: ', data);
      } catch (er) {
        setLoading(true);
        console.log('Caught an error loading the screen content: ', er);
      }
    })();
  }, [refresh]);

  const handleRefresh = () => {
    setRefresh(prev => !prev);
  };

  const handleCardPress = () => {
    if (loading) {
      return;
    }
    navigation.navigate('Details', data!);
  };

  const getInitials = (name: string): string => {
    return name
      ?.split(' ')
      ?.filter(word => word.length > 0)
      ?.map(word => word[0].toUpperCase())
      ?.join('');
  };

  return (
    <ViewComponent>
      <View style={styles.container}>
        <View style={styles.header}>
          <TextComponent
            text={formatted}
            size={16}
            color="grey"
            fontWeight="600"
          />
          <View style={styles.rowView}>
            <TextComponent text="Today" size={28} fontWeight="600" />
            <View style={styles.profile}>
              <TextComponent
                text={getInitials(data?.userName!) || 'VS'}
                size={20}
                fontWeight="600"
              />
            </View>
          </View>
        </View>
        <CustomCard
          logo={data?.logo!}
          pressable
          thumbnail={data?.thumbNailImage!}
          title={data?.title!}
          subtitle={data?.subTitle!}
          onRefreshPress={handleRefresh}
          onPress={handleCardPress}
        />
      </View>
    </ViewComponent>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
  screenCenterView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
