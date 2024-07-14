// types.d.ts
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      name?: string | null | undefined;
      email?: string | null | undefined;
      image?: string | null | undefined;
      username?: string | null | undefined;
      uid?: string | null | undefined;
    };
  }

  interface User {
    username?: string | null | undefined;
    uid?: string | null | undefined;
  }
}
