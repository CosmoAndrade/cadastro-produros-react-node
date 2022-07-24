import React from "react";
import { Input } from "../../styles/form-styles";

const InputText = (props) => {
  return (
    <div>
      <label htmlFor={props.id}>{props.text}</label>
      <Input
        id={props.id}
        placeholder={props.placeholder}
        onChange={props.callback}
        type={props.type}
      ></Input>
    </div>
  );
};

export default InputText;
