import { useLoaderData, useNavigate, type LoaderFunctionArgs } from "react-router";
import { MDViewer } from "../components/MDViewer";
import { Layout } from "../layout/Layout";
import axios, { type AxiosResponse } from "axios";
import { AxiosClient } from "../api-client/AxiosClient";
import { useEffect } from "react";

export async function loaderConfirmEmailPage(args: LoaderFunctionArgs): Promise<boolean> {
  try {
    const url = new URL(args.request.url);
    const email = url.searchParams.get('email') as string;
    const token = url.searchParams.get('token') as string;

    console.log({ email, token });
    const status = await AxiosClient.confirmEmailRegistration({ body: { email, token } });
    return status;
  } catch (err: any) {
    return false;
  }
}

export function ConfirmEmailPage() {
  const ok: boolean = useLoaderData();
  const navigate = useNavigate();

  useEffect(() => {
    if (!ok) {
      return () => {};
    }

    const timer = setTimeout(() => {
      navigate("/zero");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate, ok]);

  return (
    <Layout>
      <div className="flex-1 flex flex-col px-6 md:px-[10%] py-5 lg:py-15 pb-20">
        <div>
          { ok ? 'Email verified, redirect to login page in 3 seconds...' : 'Invalid email verification token.' }
        </div>
      </div>
    </Layout>
  );
}
