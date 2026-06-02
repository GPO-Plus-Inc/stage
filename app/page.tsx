"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";

export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {

      const res = await api.post("/v1/login", {
        email,
        password,
      });

      console.log(res.data);

      // login success → dashboard redirect
      router.push("/dashboard");

    } catch (err: any) {

      alert(err.response?.data?.message || "Login failed");

    }
  };

  return (
    <div className="hold-transition">
      <div className="login-box">

        <div className="login-logo">
          Field Service Manager
        </div>

        <div className="login-box-body">

          <p className="login-box-msg">
            Sign in to start your session
          </p>

          <form onSubmit={handleLogin}>

            <div className="form-group has-feedback">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>

            <div className="form-group has-feedback">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
            </div>

            <div className="row">
              <div className="col-xs-12">
                <button
                  type="submit"
                  className="btn btn-primary btn-block btn-flat"
                >
                  Sign In
                </button>
              </div>
            </div>

          </form>

        </div>

      </div>
    </div>
  );
}