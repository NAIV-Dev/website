import { addToast, Button, Input } from "@heroui/react";
import { useState } from "react";
import { AxiosClient } from "../../api-client/AxiosClient";
import { ZSUtility } from "./zero-service-utility";
import { ZSRegisterFormData, ZSRegisterFormModal } from "./ZSRegisterFormModal";
import { ZSForgotPasswordFormData, ZSForgotPasswordFormModal } from "./ZSForgotPasswordFormModal";
import { GoogleLoginButton } from "../GoogleLoginButton";
import { GoogleOAuthProvider } from "@react-oauth/google";

interface ZSLoginSubpageProps {
  onLoginSuccess(): void
}

export function ZSLoginSubpage(props: ZSLoginSubpageProps) {
  const [loading_login, setLoadingLogin] = useState<boolean>(false);
  const [loading_register, setLoadingRegister] = useState<boolean>(false);
  const [loading_forgot_password, setLoadingForgotPassword] = useState<boolean>(false);
  const [open_register, setOpenRegister] = useState<boolean>(false);
  const [open_forgot_password, setOpenForgotPassword] = useState<boolean>(false);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [register_form, setRegisterForm] = useState<ZSRegisterFormData>({
    email: '',
    password: '',
    fullname: ''
  });
  const [forgot_password_form, setForgotPasswordForm] = useState<ZSForgotPasswordFormData>({
    email: ''
  })

  async function login() {
    if (loading_login) {
      return;
    }

    try {
      setLoadingLogin(true);
      const res = await AxiosClient.loginUser({ body: { email, password } });
      ZSUtility.setUser(res.token, res.user);
      props.onLoginSuccess();
    } catch (err: any) {
      addToast({
        title: 'Error',
        description: err?.response?.data?.toString()
      });
    } finally {
      setLoadingLogin(false);
    }
  }

  async function register() {
    if (loading_register) {
      return;
    }

    try {
      setLoadingRegister(true);
      const res = await AxiosClient.registerUser({ body: register_form });
      addToast({
        title: 'Success',
        description: `We've sent a verification email, please confirm your email first.`
      });
      setOpenRegister(false);
    } catch (err: any) {
      addToast({
        title: 'Error',
        description: err?.response?.data?.toString()
      });
    } finally {
      setLoadingRegister(false);
    }
  }

  async function forgotPassword() {
    if (loading_forgot_password) {
      return;
    }

    try {
      setLoadingForgotPassword(true);
      await AxiosClient.forgetPassword({ body: forgot_password_form });
      addToast({
        title: 'Success',
        description: `We've sent an email to reset your password.`
      });
      setOpenForgotPassword(false);
    } catch (err: any) {
      addToast({
        title: 'Error',
        description: err?.response?.data?.toString()
      });
    } finally {
      setLoadingForgotPassword(false);
    }
  }

  return (
    <>
      <div className={`
        flex flex-col items-center justify-center px-6 gap-6 w-full
        md:w-[500px]
      `}>
        <div className="font-bold text-2xl text-center">
          Login into Zero Services
        </div>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_WEB_CLIENT_ID ?? ""}>
          <GoogleLoginButton onSuccess={() => window.location.reload()} />
        </GoogleOAuthProvider>
        <div className="flex w-full items-center gap-5 my-2">
          <div className="flex-1 min-h-px h-px bg-zinc-700" />
          <div>or</div>
          <div className="flex-1 min-h-px h-px bg-zinc-700" />
        </div>
        <Input
          value={email}
          onChange={e => setEmail(e.target.value)}
          label={'Email'}
          labelPlacement={'outside'}
          type={'email'}
          placeholder="Email"
          onKeyUp={e => e.key === 'Enter' && login()} />
        <Input
          value={password}
          onChange={e => setPassword(e.target.value)}
          label={'Password'}
          labelPlacement={'outside'}
          type={'password'}
          placeholder="Password"
          onKeyUp={e => e.key === 'Enter' && login()} />
        <Button 
          color="danger"
          variant="flat"
          onPress={login}
          isLoading={loading_login}
          className="w-full">
          Login
        </Button>
        <div className="flex flex-col items-center gap-2 mt-4">
          <div 
            onClick={() => setOpenRegister(true)}
            className="text-yellow-400 cursor-pointer">
            Register New Account
          </div>
          <div
            onClick={() => setOpenForgotPassword(true)}
            className="text-rose-400 cursor-pointer">
            Forgot Password
          </div>
        </div>
      </div>
      <ZSRegisterFormModal
        loading={loading_register}
        onSubmit={register}
        open={open_register}
        setOpen={setOpenRegister}
        value={register_form}
        setValue={setRegisterForm} />
      <ZSForgotPasswordFormModal
        loading={loading_forgot_password}
        onSubmit={forgotPassword}
        open={open_forgot_password}
        setOpen={setOpenForgotPassword}
        value={forgot_password_form}
        setValue={setForgotPasswordForm} />
    </>
  );
}
