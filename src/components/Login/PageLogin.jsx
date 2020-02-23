import React from "react";
import BackImg from "../../assets/images/pic.jpg";
import IconPassword from "../../assets/images/password-icon.png";
import IconUser from "../../assets/images/user-icon.png";

const PageLogin = () => {
  return (
    <main className="form-pages-container">
      <article className="picture-container">
        <img src={BackImg} alt="" />
      </article>
      <form className="text-container">
        <h1 className="title">el-shorouk academy</h1>
        <h2 className="code-text">Welcome</h2>
        <div className="input-container">
          <img src={IconUser} alt="" />
          <input placeholder="Username" type="text" id="username" />
        </div>
        <div className="input-container">
          <img src={IconPassword} alt="" />
          <input placeholder="Password" type="password" id="password" />
        </div>
        <div className="btn-container">
          <button type="submit">login</button>
        </div>
      </form>
    </main>
  );
};

export default PageLogin;
