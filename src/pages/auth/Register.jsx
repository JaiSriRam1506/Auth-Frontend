import styles from "./auth.module.scss";
import Card from "../../components/card/Card";
import { TiUserAddOutline } from "react-icons/ti";
import { FaTimes } from "react-icons/fa";
import { BsCheck2All } from "react-icons/bs";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { validateEmail } from "../../utils/index";
import { useDispatch } from "react-redux";

const initialState = {
  name: "",
  email: "",
  password: "",
  cPassword: "",
};
function Register() {
  const [formData, setFormData] = useState(initialState);
  const { name, email, password, cPassword } = formData;

  // const dispatch = useDispatch();

  /* To Check and Validate the password is matching the criteria or not */
  const [uCase, setUCase] = useState(false);
  const [num, setNum] = useState(false);
  const [sChar, setSChar] = useState(false);
  const [passLen, setPassLen] = useState(false);

  const registerUser = async (e) => {
    e.preventDefault(); /* To stop the form from re-loading we need this call */
    /* Validation of User Input */
    console.log("Inside registerUser Function");
    if (!name || !email || !password) {
      return toast.error("All Field are required");
    }
    if (password.length < 6) {
      return toast.error("Password length should be at least 6 character");
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email add");
    }
    if (password !== cPassword) {
      console.log("Pass not Matching");
      return toast.error("Password don't match");
    }
    const userData = {
      name,
      email,
      password,
    };
    //await dispatch(register(userData));
  };

  useEffect(() => {
    console.log("UseEffect Has called");
    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) setUCase(true);
    else setUCase(false);

    if (password.match(/([0-9])/)) setNum(true);
    else setNum(false);

    if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) setSChar(true);
    else setSChar(false);

    if (password.length >= 8) setPassLen(true);
    else setPassLen(false);
  }, [password]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData({ ...formData, [name]: value });
  };

  const crossCheckIcon = <FaTimes size={15} color="red" />;
  const greenTickIcon = <BsCheck2All size={15} color="green" />;

  const switchIcons = (condition) => {
    return condition ? greenTickIcon : crossCheckIcon;
  };

  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <TiUserAddOutline size={35} color="#999" />
          </div>
          <h2>Register</h2>
          <form onSubmit={registerUser}>
            <input
              type="text"
              name="name"
              value={name}
              placeholder="Please Enter your name"
              required
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="email"
              value={email}
              placeholder="Please Enter your email"
              required
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="password"
              value={password}
              placeholder="Please Enter your password"
              required
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="cPassword"
              value={cPassword}
              placeholder="Please Confirm your password"
              required
              onChange={handleInputChange}
              onPaste={(e) => {
                //to Stop the form from loading
                e.preventDefault();
                toast.error("Please type instead of copy-paste");
                return false;
              }}
            />
            <Card cardClass="form-list">
              <ul className="form-list">
                <li>
                  <span className={styles.indicator}>
                    {switchIcons(uCase)} &nbsp; LowerCase & UpperCase
                  </span>
                </li>
                <li>
                  <span className={styles.indicator}>
                    {switchIcons(num)} &nbsp; Number(0-9)
                  </span>
                </li>
                <li>
                  <span className={styles.indicator}>
                    {switchIcons(sChar)} &nbsp; Special Character(!@######$%^&*)
                  </span>
                </li>
                <li>
                  <span className={styles.indicator}>
                    {switchIcons(passLen)} &nbsp; At least 8 Character
                  </span>
                </li>
              </ul>
            </Card>
            <button className="--btn --btn-primary --btn-block">
              Register
            </button>
          </form>
          <Link to="/forget">Forget Password</Link>
          <span className={styles.register}>
            <Link to="/">Home</Link>
            <p>&nbsp; Already Have an Account?&nbsp;</p>
            <Link to="/login">Login</Link>
          </span>
        </div>
      </Card>
    </div>
  );
}

export default Register;
