const Text = ({ 
  children, 
  variant = 'body', 
  color = 'default',
  className = '',
  as: Component = 'p',
  ...props 
}) => {
  const variants = {
    display: 'font-display text-4xl font-normal',
    h1: 'text-3xl font-bold',
    h2: 'text-2xl font-semibold',
    h3: 'text-xl font-semibold',
    h4: 'text-lg font-medium',
    body: 'text-base font-normal',
    bodyLarge: 'text-lg font-normal',
    small: 'text-sm font-normal',
    caption: 'text-xs font-normal'
  };

  const colors = {
    default: 'text-gray-900',
    muted: 'text-gray-600',
    light: 'text-gray-500',
    primary: 'text-primary',
    secondary: 'text-secondary',
    success: 'text-accent',
    white: 'text-white'
  };

  const filteredProps = { ...props };
  delete filteredProps.variant;
  delete filteredProps.color;
  delete filteredProps.as;

  return (
    <Component 
      className={`${variants[variant]} ${colors[color]} ${className}`}
      {...filteredProps}
    >
      {children}
    </Component>
  );
};

export default Text;