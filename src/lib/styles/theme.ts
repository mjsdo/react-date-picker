const color = {
  white: '#FFF',
  gray6: '#F5F5F7',
  gray5: '#E0E0E0',
  gray4: '#BDBDBD',
  gray3: '#828282',
  gray2: '#4F4F4F',
  gray1: '#333333',
} as const;

const fontSize = {
  xs: '12px',
  sm: '14px',
  md: '16px',
  lg: '18px',
  xl: '20px',
} as const;

interface Theme {
  color: typeof color;
  fontSize: typeof fontSize;
}

const theme: Theme = {
  color,
  fontSize,
};

export default theme;
