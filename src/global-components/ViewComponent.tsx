import React from 'react';
import {
  Keyboard,
  Platform,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { screenHeight } from '../utils/Screen';

interface CommonViewComponentProps {
  children?: React.ReactNode;
  withTouch?: boolean;
  noPadding?: boolean;
}

const ViewComponent = (props: CommonViewComponentProps) => {
  const { children, withTouch = true, noPadding = true } = props;

  const renderBackground = () => {
    return (
      <View
        style={[
          styles.container,
          {
            paddingHorizontal: noPadding ? 0 : 16,
          },
        ]}
      >
        <StatusBar barStyle={'dark-content'} backgroundColor={'#000'} />
        {children}
      </View>
    );
  };

  return withTouch ? (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
      style={styles.touchableContainer}
    >
      {renderBackground()}
    </TouchableWithoutFeedback>
  ) : (
    renderBackground()
  );
};

export default ViewComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: Platform.OS === 'ios' ? screenHeight / 14 : 0,
  },
  touchableContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
