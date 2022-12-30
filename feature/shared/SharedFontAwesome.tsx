import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useTheme } from 'native-base';
import React, { useEffect, useState } from 'react';

type SharedFontAwesomeProps = {
  icon: IconProp;
  color?: string;
  size?: number;
};

function SharedFontAwesome({ icon, color, size = 16 }: SharedFontAwesomeProps) {
  const theme = useTheme();

  const [colorFormatted, setColorFormatted] = useState<string>('gray');

  const themeColors = theme.colors as any;

  useEffect(() => {
    if (color) {
      const [themeColor, shade] = color.split('.');
      const shadeFormatted = shade ? shade : 500;

      if (color.startsWith('#')) {
        setColorFormatted(color);
      } else if (color === 'white' || color === 'black') {
        setColorFormatted(color);
      } else {
        setColorFormatted(themeColors[themeColor][shadeFormatted]);
      }
    }
  }, [color]);

  return (
    <>
      <FontAwesomeIcon icon={icon} color={colorFormatted} size={size}  style={{marginRight: 5}}/>
    </>
  );
}

export default SharedFontAwesome;
