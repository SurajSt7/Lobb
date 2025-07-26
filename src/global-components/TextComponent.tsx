import React from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';

interface Props {
  text: string;
  size?: number;
  color?: string;
  flex?: number;
  styles?: StyleProp<TextStyle>;
  fontWeight?:
    | 'bold'
    | 'normal'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  font?: string;
  numberOfLines?: number;
  underline?: boolean;
  lineHeight?: number;
  elipsizeMode?: 'tail' | 'middle' | 'clip';
}

const TextComponent = (props: Props) => {
  const {
    text,
    size,
    flex,
    styles,
    fontWeight,
    textAlign,
    numberOfLines,
    underline,
    lineHeight,
    color,
    elipsizeMode,
  } = props;

  return (
    <Text
      allowFontScaling={false}
      style={[
        {
          textDecorationLine: underline ? 'underline' : 'none',
          fontSize: size ?? 14,
          flex: flex ?? 0,
          fontWeight: fontWeight ?? 'normal',
          textAlign: textAlign ?? 'auto',
          lineHeight: lineHeight,
          color: color ?? '#000',
        },
        styles,
      ]}
      ellipsizeMode={elipsizeMode}
      numberOfLines={numberOfLines}
    >
      {text}
    </Text>
  );
};

export default TextComponent;
