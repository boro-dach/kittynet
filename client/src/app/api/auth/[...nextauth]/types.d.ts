// types.d.ts
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      name?: string | null 
      email?: string | null ;
      image?: string | null ;
      username?: string | null ;
      uid?: string | null ;
    };
  }

  interface User {
    username?: string | null ;
    uid?: string | null ;
  }
}
