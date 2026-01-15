import type { User } from "../../api-client/model/table/User";

export namespace ZSUtility {
  export function setUser(token: string, user: User) {
    localStorage.setItem('zs-token', token);
    localStorage.setItem('zs-user', JSON.stringify(user));
  }

  export function getUser(): User {
    const user = localStorage.getItem('zs-user');
    if (!user) {
      return {
        id: '' as any,
        fullname: '' as any,
        email: '' as any,
        password: '' as any,
        google_user_id:'' as any,
        type: '' as any,
        max_domain_name_allowed: '' as any,
        max_database_allowed: '' as any,
        email_verification_token:'' as any,
        created_at: '' as any,
      };
    }

    return JSON.parse(user);
  }

  export function getToken(): string {
    const token = localStorage.getItem('zs-token');
    if (!token) {
      return '';
    }

    return `Bearer ${token}`;
  }

  export function removeUser() {
    localStorage.removeItem('zs-token');
    localStorage.removeItem('zs-user');
  }
}
