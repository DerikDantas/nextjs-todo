import classnames from 'classnames';
import React from 'react';
import {
  TextArea as AriaTextArea,
  Label,
  TextAreaProps,
  TextField
} from 'react-aria-components';

const FOCUS_CLASSES =
  'focus-within:rounded-b-none focus-within:border-b-2 focus-within:border-t-0 focus-within:border-l-0 focus-within:border-r-0 focus-within:border-primary ';

const ERROR_CLASSES =
  'rounded-b-none border-b-2 border-t-0 border-l-0 border-r-0 border-[#DC354550] focus-within:border-b-2';

interface ITextArea extends TextAreaProps {
  label?: string;
  error?: string;
  prepend?: string | React.ReactNode;
  append?: string | React.ReactNode;
  required?: boolean;
}

function TextArea({
  label,
  prepend,
  append,
  error,
  required,
  ...props
}: ITextArea) {
  return (
    <TextField className="relative flex flex-col gap-1">
      {label && (
        <Label
          className="font-montserrat text-base font-normal text-neutralPrimary"
          htmlFor={props.id ?? ''}
        >
          {label}
          {required && <span className="ml-1 text-red-600">*</span>}
        </Label>
      )}
      <div
        className={classnames(
          'relative flex items-center justify-between gap-4 rounded-md bg-[#35353510] px-3 py-3',
          FOCUS_CLASSES,
          error ? ERROR_CLASSES : 'border border-[#35353540]'
        )}
      >
        {prepend && prepend}
        <AriaTextArea
          className={classnames(
            'w-full bg-[transparent] text-base text-neutralPrimary placeholder:text-[#35353580] focus:outline-none focus-visible:outline disabled:cursor-not-allowed disabled:opacity-30'
          )}
          {...props}
        />
        {append && append}
      </div>
      {error && (
        <p className="absolute bottom-[-24px] text-sm italic text-red-500">
          {error}
        </p>
      )}
    </TextField>
  );
}

export default TextArea;
