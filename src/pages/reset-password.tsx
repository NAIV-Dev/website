import { useLoaderData, useNavigate, type LoaderFunctionArgs } from "react-router";
import { MDViewer } from "../components/MDViewer";
import { Layout } from "../layout/Layout";
import axios, { type AxiosResponse } from "axios";
import { AxiosClient } from "../api-client/AxiosClient";
import { useEffect, useState } from "react";
import { addToast, Button, Input } from "@heroui/react";

export async function loaderResetPasswordPage(args: LoaderFunctionArgs): Promise<any> {
  try {
    const url = new URL(args.request.url);
    const email = url.searchParams.get('email') as string;
    const token = url.searchParams.get('token') as string;

    return { email, token };
  } catch (err: any) {
    return { email: '', token: '' };
  }
}

export function ResetPasswordPage() {
  const { email, token } = useLoaderData();
  const [password, setPassword] = useState<string>('');
  const [re_password, setRePassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  async function resetPassword() {
    try {
      setLoading(true);
      await AxiosClient.resetPasswordByToken({
        body: {
          email,
          token,
          new_password: password,
          re_new_password: re_password,
        }
      });
      alert('New password succesfully created.');
      window.location.href = '/zero';
    } catch (err: any) {
      addToast({
        title: 'Error',
        description: err?.response?.data?.toString()
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <div className="flex-1 flex flex-col items-center justify-center px-6 md:px-[10%] py-5 lg:py-15 pb-20">
        <div className={`
        flex flex-col items-center justify-center px-6 gap-6 w-full
        md:w-[500px] md:mb-20
      `}>
          <div className="font-bold text-2xl">
            Reset Your Password Here
          </div>
          <Input
            value={password}
            onChange={e => setPassword(e.target.value)}
            label={'New Password'}
            labelPlacement={'outside'}
            type={'password'}
            placeholder="New Password"
            onKeyUp={e => e.key === 'Enter' && resetPassword()} />
          <Input
            value={re_password}
            onChange={e => setRePassword(e.target.value)}
            label={'Retype New Password'}
            labelPlacement={'outside'}
            type={'password'}
            placeholder="Retype New Password"
            onKeyUp={e => e.key === 'Enter' && resetPassword()} />
          <Button
            color="danger"
            variant="flat"
            onPress={resetPassword}
            isLoading={loading}
            className="w-full">
            Create New Password
          </Button>
        </div>
      </div>
    </Layout>
  );
}
