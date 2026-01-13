'use server'

import { signIn } from '@/auth.config'

export const login = async (email: string, password: string) => {

    try {
      await signIn('credentials', { email, password, redirect: false }, )

      return { ok: true }

    } catch (error) {
      console.error('error', error)
      return { ok: false, message: error }
    }
}