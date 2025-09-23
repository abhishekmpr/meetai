// lib/auth.ts

import { betterAuth } from "better-auth";
import * as schema from "@/db/schema";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";




export const auth = betterAuth({

  socialProviders: {
        github: { 
            clientId: process.env.GITHUB_CLIENT_ID as string, 
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
        }, 
        

        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
    
    },
  emailAndPassword: {
    enabled: true,
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      ...schema,
    },
  }),
});
