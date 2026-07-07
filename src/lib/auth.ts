import { createClient } from './supabase'

export interface UserData {
  first_name?: string
  last_name?: string
  phone?: string
  // Ajoutez d'autres champs au besoin
}

export async function signIn(email: string, password: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  return { data, error }
}

export async function signUp(email: string, password: string, userData: UserData) {
  const supabase = createClient()
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: userData
    }
  })

  return { data, error }
}

export async function signOut() {
  const supabase = createClient()
  
  const { error } = await supabase.auth.signOut()
  
  return { error }
}

export async function resetPassword(email: string) {
  const supabase = createClient()
  
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/update-password`,
  })

  return { error }
}

export async function updatePassword(newPassword: string) {
  const supabase = createClient()
  
  const { error } = await supabase.auth.updateUser({
    password: newPassword
  })

  return { error }
}

export async function getSession() {
  const supabase = createClient()
  
  const { data: { session }, error } = await supabase.auth.getSession()
  
  return { session, error }
}