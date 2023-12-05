import { Button as AriaButton, ButtonProps } from 'react-aria-components';

function Button(props: ButtonProps) {
  return (
    <AriaButton
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
      {...props}
    >
      {props.children}
    </AriaButton>
  );
}

export default Button;
