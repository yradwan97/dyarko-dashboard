import React from "react";
import { useForm } from "react-hook-form";
import Form, { CheckboxInput, InputGroup } from "components/shared/form";

const BuyingOptionsForm = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const signUpSchema = {
    name: {
      id: "name",
      label: "Name",
      placeholder: "Full Name",
      register: {
        ...register("name", {
          required: "Name is required",
          pattern: {
            value: /^[a-zA-Z ]+$/,
            message: "Please enter a valid name",
          },
        }),
      },
      error: errors.name,
    },
    email: {
      id: "email",
      label: "Email",
      placeholder: "hi@example.com",
      register: {
        ...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[a-zA-Z0-9_\-.]+@[a-zA-Z-.]+.[a-zA-Z-.]+$/,
            message: "Please enter a valid email",
          },
        }),
      },
      error: errors.email,
    },
    civilianId: {
      id: "civilianId",
      label: "Civilian ID",
      placeholder: "Ex. 813843478293",
      register: {
        ...register("civilianId", {
          required: "Civilian ID is required",
          pattern: {
            value: /^\d{12}$/,
            message: "Please enter a valid Civilian ID (8 numbers)",
          },
        }),
      },
      error: errors.civilianId,
    },
    password: {
      id: "password",
      label: "Password",
      placeholder: "Enter password",
      register: {
        ...register("password", {
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Minimum character length is 8",
          },
        }),
      },
      error: errors.password,
    },
    phoneNumber: {
      id: "phoneNumber",
      label: "Phone Number",
      placeholder: "Enter phone Number",
      register: {
        ...register("phoneNumber", {
          required: "Phone Number is required",
          minLength: {
            value: 8,
            message: "Minimum character length is 8",
          },
        }),
      },
      error: errors.phoneNumber,
    },
    isProperty: {
      id: "isProperty",
      type: "checkbox",
      label: "I am a property manager",
      register: {
        ...register("isProperty"),
      },
    },
  };

  return (
    <>
      <Form formHandleSubmit={handleSubmit} submitHandler={props.handler}>
        <InputGroup {...signUpSchema.name} />
        <InputGroup {...signUpSchema.email} />
        <InputGroup {...signUpSchema.civilianId} />
        <CheckboxInput {...signUpSchema.isProperty} />
      </Form>
    </>
  );
};

export default BuyingOptionsForm;
