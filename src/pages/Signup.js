import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Formik } from "formik";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import { selectors, actions } from "../redux/modules/Signup";

const Signup = ({ signup }) => {
  return (
    <>
      <h2>新規登録</h2>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={values => signup(values)}
        render={({ values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <FormControl>
              <InputLabel>email</InputLabel>
              <Input
                name="email"
                value={values.email}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <InputLabel>password</InputLabel>
              <Input
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
              />
            </FormControl>
            <Button type="submit">送信</Button>
          </form>
        )}
      />
    </>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  signup: form => dispatch(actions.signupRequest(form))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);
