import { gql, useMutation } from "@apollo/client";
import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../Components/Logo";
import { useCreateSubscriberMutation } from "../graphql/generated";

import Code_Mockup from "../assets/code_mockup.png";

export function Subscribe() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const uid = localStorage.getItem("uid");

    if (uid) {
      navigate("/event");
    }
  });

  const [createSubscribe, { loading }] = useCreateSubscriberMutation();

  async function handleSubscribe(event: FormEvent) {
    event.preventDefault();

    try {
      const { data, errors } = await createSubscribe({
        variables: {
          name,
          email,
        },
        onError() {
          alert("Something wrong");
        },
      });

      if (data?.createSubscriber?.id) {
        localStorage.setItem("uid", data?.createSubscriber?.id || "");

        navigate("/event");
      }
    } catch (error) {}
  }

  return (
    <div className="min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center">
      <div className="w-full max-w-[1100px] flex flex-row items-center justify-between mt-20 mx-auto">
        <div className="max-w-[640px]">
          <Logo />
          <h1 className="mt-8 text-[2.5rem] leading-tight">
            Build a{" "}
            <strong className="text-blue-500">complete application</strong> from
            scratch with <strong className="text-blue-500">ReactJS</strong>
          </h1>
          <p className="mt-4 text-gray-200 leading-relaxed">
            In just one week you will master in practice one of the most used
            technologies and with high demand to access the best opportunities
            on the markets
          </p>
        </div>
        <div className="p-8 bg-gray-700 border border-gray-500 rounded">
          <strong className="text-2xl mb-6 block">Subscribe for free</strong>
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col gap-2 w-full"
          >
            <input
              type="text"
              className="bg-gray-900 rounded px-5 h-14"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              className="bg-gray-900 rounded px-5 h-14"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              className="mt-4 bg-green-500 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 transition-colors disabled:opacity-50"
              type="submit"
              disabled={loading}
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <img src={Code_Mockup} className="mt-10" alt="Image" />
    </div>
  );
}
