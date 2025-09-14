export interface Account {
  id: string
  tags: { text: string }[]
  type: string
  login: string
  password: string | null
}

export interface AccountRowProps {
  account: Account
}

export interface ValidationErrors {
  tags?: string
  login?: string
  password?: string
}
