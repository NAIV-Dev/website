import axios from 'axios';
import { T_loginUser } from "./api/loginUser";
import { T_registerUser } from "./api/registerUser";
import { T_loginWithGoogle } from "./api/loginWithGoogle";
import { T_confirmEmailRegistration } from "./api/confirmEmailRegistration";
import { T_forgetPassword } from "./api/forgetPassword";
import { T_resetPasswordByToken } from "./api/resetPasswordByToken";
import { T_getDatabases } from "./api/getDatabases";
import { T_createDatabase } from "./api/createDatabase";
import { T_getDatabase } from "./api/getDatabase";
import { T_getDatabaseUsageQuota } from "./api/getDatabaseUsageQuota";
import { T_deleteDatabase } from "./api/deleteDatabase";
import { T_getDomains } from "./api/getDomains";
import { T_createDomain } from "./api/createDomain";
import { T_getDomain } from "./api/getDomain";
import { T_updateDomain } from "./api/updateDomain";
import { T_deleteDomain } from "./api/deleteDomain";

export namespace AxiosClient {

  function __build_path(base_url: string, url_path: string, path_param: { [key: string]: any }) {
    const build_path = url_path.replace(/:([a-zA-Z_]\w*)/g, (_, key) => {
      if (path_param[key] === undefined) {
        throw new Error(`Missing param: ${key}`);
      }
      return encodeURIComponent(String(path_param[key]));
    });
    const url = new URL(build_path, base_url);
    return url.toString();
  }
  export class BaseURL {
    public base_url: string = '';
    static _instance: BaseURL | undefined;
    public static get instance(): BaseURL {
      if (!BaseURL._instance) {
        BaseURL._instance = new BaseURL();
      }
      return BaseURL._instance;
    }
    private constructor(){}
    public set(_base_url: string) {
      this.base_url = _base_url;
    }
  }

  export const loginUser: T_loginUser = async (req, base_url: string = BaseURL.instance.base_url) => {
    const final_url = __build_path(base_url, '/auth/login', {});
    return (await axios['post'](final_url, req.body, { })).data as any;
  }
  export const registerUser: T_registerUser = async (req, base_url: string = BaseURL.instance.base_url) => {
    const final_url = __build_path(base_url, '/auth/register', {});
    return (await axios['post'](final_url, req.body, { })).data as any;
  }
  export const loginWithGoogle: T_loginWithGoogle = async (req, base_url: string = BaseURL.instance.base_url) => {
    const final_url = __build_path(base_url, '/auth/login-with-google', {});
    return (await axios['post'](final_url, req.body, { })).data as any;
  }
  export const confirmEmailRegistration: T_confirmEmailRegistration = async (req, base_url: string = BaseURL.instance.base_url) => {
    const final_url = __build_path(base_url, '/confirm-email-registration', {});
    return (await axios['post'](final_url, req.body, { })).data as any;
  }
  export const forgetPassword: T_forgetPassword = async (req, base_url: string = BaseURL.instance.base_url) => {
    const final_url = __build_path(base_url, '/forget-password', {});
    return (await axios['post'](final_url, req.body, { })).data as any;
  }
  export const resetPasswordByToken: T_resetPasswordByToken = async (req, base_url: string = BaseURL.instance.base_url) => {
    const final_url = __build_path(base_url, '/reset-password-by-token', {});
    return (await axios['post'](final_url, req.body, { })).data as any;
  }
  export const getDatabases: T_getDatabases = async (req, base_url: string = BaseURL.instance.base_url) => {
    const final_url = __build_path(base_url, '/database', {});
    return (await axios['get'](final_url, { headers: req.headers as any, })).data as any;
  }
  export const createDatabase: T_createDatabase = async (req, base_url: string = BaseURL.instance.base_url) => {
    const final_url = __build_path(base_url, '/database', {});
    return (await axios['post'](final_url, {}, { headers: req.headers as any, })).data as any;
  }
  export const getDatabase: T_getDatabase = async (req, base_url: string = BaseURL.instance.base_url) => {
    const final_url = __build_path(base_url, '/database/:id', req.path);
    return (await axios['get'](final_url, { headers: req.headers as any, })).data as any;
  }
  export const getDatabaseUsageQuota: T_getDatabaseUsageQuota = async (req, base_url: string = BaseURL.instance.base_url) => {
    const final_url = __build_path(base_url, '/database/:id/usage-quota-in-MB', req.path);
    return (await axios['get'](final_url, { headers: req.headers as any, })).data as any;
  }
  export const deleteDatabase: T_deleteDatabase = async (req, base_url: string = BaseURL.instance.base_url) => {
    const final_url = __build_path(base_url, '/database/:id', req.path);
    return (await axios['delete'](final_url, { headers: req.headers as any, })).data as any;
  }
  export const getDomains: T_getDomains = async (req, base_url: string = BaseURL.instance.base_url) => {
    const final_url = __build_path(base_url, '/domain', {});
    return (await axios['get'](final_url, { headers: req.headers as any, })).data as any;
  }
  export const createDomain: T_createDomain = async (req, base_url: string = BaseURL.instance.base_url) => {
    const final_url = __build_path(base_url, '/domain', {});
    return (await axios['post'](final_url, req.body, { headers: req.headers as any, })).data as any;
  }
  export const getDomain: T_getDomain = async (req, base_url: string = BaseURL.instance.base_url) => {
    const final_url = __build_path(base_url, '/domain/:domain_name', req.path);
    return (await axios['get'](final_url, { headers: req.headers as any, })).data as any;
  }
  export const updateDomain: T_updateDomain = async (req, base_url: string = BaseURL.instance.base_url) => {
    const final_url = __build_path(base_url, '/domain/:domain_name', req.path);
    return (await axios['put'](final_url, req.body, { headers: req.headers as any, })).data as any;
  }
  export const deleteDomain: T_deleteDomain = async (req, base_url: string = BaseURL.instance.base_url) => {
    const final_url = __build_path(base_url, '/domain/:domain_name', req.path);
    return (await axios['delete'](final_url, { headers: req.headers as any, })).data as any;
  }
}