import React from "react";

export const LoginPage = () => {
  return (
    <>
      <div>LoginPage</div>
      <form>
        <div className="">
          <div className="">
            <label htmlFor="email">Username</label>
            <input type="text" id="email" />
          </div>
          <div className="">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
          </div>
        </div>
        <button>login</button>
      </form>
    </>
  );
};
