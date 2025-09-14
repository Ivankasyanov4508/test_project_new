import { defineStore } from 'pinia'
import type { Account } from '~/types'

export const useAccountStore = defineStore(
  'accounts',
  () => {
    const accounts = ref<Account[]>([])

    const addAccount = (): void => {
      const newAccount: Account = {
        id: Date.now().toString(),
        tags: [],
        type: 'Локальная',
        login: '',
        password: '',
      }
      accounts.value.push(newAccount)
    }

    const removeAccount = (id: string): void => {
      const index = accounts.value.findIndex((account) => account.id === id)
      if (index !== -1) {
        accounts.value.splice(index, 1)
      }
    }

    const updateAccount = (id: string, updates: Partial<Account>): void => {
      const account = accounts.value.find((account) => account.id === id)
      if (account) {
        Object.assign(account, updates)
      }
    }

    return {
      accounts,
      addAccount,
      removeAccount,
      updateAccount,
    }
  },
  {
    persist: {
      storage: import.meta.client ? sessionStorage : undefined,
      pick: ['accounts'],
    },
  },
)
