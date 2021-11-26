import { useEffect, useRef, useState } from "react";

type InputWithLabelProps = {
  id: string;
  value: string;
  type?: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isFocused?: boolean;
  children?: React.ReactNode;
};

const InputWithLabel = ({
  id,
  children,
  type = "text",
  value,
  onInputChange,
  isFocused,
}: InputWithLabelProps) => {
  const [clickAutoFocus, setClickAutoFocus] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null!);
  useEffect(() => {
    if (inputRef.current && clickAutoFocus) {
      inputRef.current.focus();
    }
  }, [clickAutoFocus]);

  return (
    <>
      <label htmlFor={id}>Search: </label>
      <input
        style={{
          display: "block",
          padding: "0.5rem",
          borderRadius: "24px",
          border: "none",
          outline: "none",
          width: "350px",
        }}
        ref={inputRef}
        id={id}
        type={type}
        value={value}
        onChange={onInputChange}
      />
    </>
  );
};

export default InputWithLabel;
