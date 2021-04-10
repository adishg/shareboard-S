import { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { CONSTANT } from "../../../constants/constants";
import { IRegister } from "../../../models/register-payload.model";
import { APIService } from "../../../services/api/api-service";
import { register } from "../../../services/auth-service";
import "./Register.scss";

// TODO Add Validators
export const Register: React.FC = () => {
  enum RegisterFormKeys {
    FIRST_NAME = "firstname",
    EMAIL = "email",
    LAST_NAME = "lastname",
    PASSWORD = "password",
    USERNAME = "username",
    CONFIRM_PASSWORD = "confirmPassword",
  }

  const [registerForm, setRegisterForm] = useState<IRegister>({
    email: "",
    firstname: "",
    lastname: "",
    password: "",
    username: "",
    confirmPassword: "",
    captcha: "1",
  });

  const [redirect, setRedirect] = useState<boolean>(false);

  useEffect(() => {
    APIService.Instance.getToken() !== null && setRedirect(true);
  }, []);

  const submitRegister = () => {
    // eslint-disable-next-line no-console
    console.log(registerForm);
    updateFormValue(RegisterFormKeys.USERNAME, registerForm.email);
    const emptyValues = Object.values(registerForm).filter(
      (value) => value.trim() === "",
    );
    if (emptyValues.length) {
      alert("Please Fill All Required Values");
      return false;
    }

    if (registerForm.confirmPassword !== registerForm.password) {
      alert("Password Fileds didn't match");
      return false;
    }

    register(registerForm).then((res) => {
      if (res && res.status === true) {
        alert("Registered Successfully");
        setRedirect(true);
      }
    });
  };

  if (redirect === true) {
    return <Redirect to="/" />;
  }

  const updateFormValue = (key: string, value: string) => {
    const updatedForm = { ...registerForm, [key]: value };
    setRegisterForm({ ...updatedForm });
  };

  return (
    <div className="cmp-register">
      <h3 className="text-center">Register</h3>
      <div className="login-brand-img">
        <img
          src={`${window.location.origin}/${CONSTANT.LOGO_IMG_NAME}`}
          alt="logo"
        />
      </div>
      <div className="main-login-form">
        <div className="row">
          <div className="col-6 form-group">
            <label htmlFor="">Firstname</label>
            <input
              value={registerForm.firstname}
              onChange={(e) =>
                updateFormValue(RegisterFormKeys.FIRST_NAME, e.target.value)
              }
              className="form-control"
              type="text"
            />
          </div>
          <div className="col-6 form-group">
            <label htmlFor="">Lastname</label>
            <input
              value={registerForm.lastname}
              onChange={(e) =>
                updateFormValue(RegisterFormKeys.LAST_NAME, e.target.value)
              }
              className="form-control"
              type="text"
            />
          </div>
        </div>
        {/* <div className="form-group">
          <label htmlFor="">Username</label>
          <input
            value={registerForm.username}
            onChange={(e) =>
              updateFormValue(RegisterFormKeys.USERNAME, e.target.value)
            }
            className="form-control"
            type="text"
          />
        </div> */}
        <div className="form-group">
          <label htmlFor="">Email</label>
          <input
            value={registerForm.email}
            onChange={(e) =>
              updateFormValue(RegisterFormKeys.EMAIL, e.target.value)
            }
            className="form-control"
            type="text"
          />
        </div>
        <div className="row">
          <div className="col-12 col-lg-6 form-group">
            <label htmlFor="">Password</label>
            <input
              value={registerForm.password}
              onChange={(e) =>
                updateFormValue(RegisterFormKeys.PASSWORD, e.target.value)
              }
              className="form-control"
              type="password"
            />
          </div>
          <div className="col-12 col-lg-6 form-group">
            <label htmlFor="">Confirm Password</label>
            <input
              value={registerForm.confirmPassword}
              onChange={(e) =>
                updateFormValue(
                  RegisterFormKeys.CONFIRM_PASSWORD,
                  e.target.value,
                )
              }
              className="form-control"
              type="password"
            />
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <button onClick={submitRegister} className="btn btn-primary">
            Sign Up
          </button>
        </div>
      </div>
      <span className="d-flex justify-content-center mt-2">
        Already have an account |
        <Link className="pl-1" to="/login">
          Sign In
        </Link>
      </span>
    </div>
  );
};
