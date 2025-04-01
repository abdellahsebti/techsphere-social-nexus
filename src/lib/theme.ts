
export const techTheme = {
  colors: {
    blue: {
      light: '#4F9EF8',
      DEFAULT: '#1E88E5',
      dark: '#0D47A1',
    },
    purple: {
      light: '#9C68F8',
      DEFAULT: '#7C4DFF',
      dark: '#5E35B1',
    },
    green: {
      light: '#6BD89C',
      DEFAULT: '#2ECE71',
      dark: '#219653',
    },
    orange: {
      light: '#FFB84D',
      DEFAULT: '#F59E0B',
      dark: '#D97706',
    },
    red: {
      light: '#FF7E82',
      DEFAULT: '#EF4444',
      dark: '#B91C1C',
    },
    yellow: {
      light: '#FFE27A',
      DEFAULT: '#FFC53D',
      dark: '#D99F0B',
    },
  },
  gradients: {
    primary: 'bg-gradient-to-r from-tech-blue to-tech-purple',
    secondary: 'bg-gradient-to-r from-tech-purple to-tech-pink',
    success: 'bg-gradient-to-r from-tech-green to-tech-teal',
    warning: 'bg-gradient-to-r from-tech-orange to-tech-yellow',
    error: 'bg-gradient-to-r from-tech-red to-tech-pink',
  }
};

export const generateGlassEffect = (opacity = 0.1) => 
  `bg-white/5 backdrop-blur-md border border-white/10 shadow-xl`;

export const cardStyles = {
  default: "rounded-xl border border-border bg-background p-6 shadow-sm transition-all hover:shadow-md",
  glass: `rounded-xl ${generateGlassEffect()} p-6 shadow-sm transition-all hover:shadow-md`,
  gradient: "rounded-xl bg-gradient-to-br from-tech-blue/10 to-tech-purple/10 p-6 shadow-sm transition-all hover:shadow-md"
};

// Animation utilities
export const animations = {
  fadeIn: "animate-fadeIn",
  slideUp: "animate-slideUp",
  slideIn: "animate-slideIn",
  pulse: "animate-pulse",
  bounce: "animate-bounce",
  spin: "animate-spin",
};
