<template>
  <div class="table-row">
    <div class="table-cell">
      <v-text-field
        v-model="localTagsValue"
        placeholder="Значение"
        variant="outlined"
        density="compact"
        hide-details
        :error="hasFieldError('tags')"
        :error-messages="getFieldError('tags')"
        @blur="handleTagsBlur"
      />
    </div>

    <div class="table-cell">
      <v-select
        v-model="localTypeValue"
        :items="accountTypes"
        variant="outlined"
        density="compact"
        hide-details
        @update:model-value="handleTypeChange"
      />
    </div>

    <div class="table-cell">
      <v-text-field
        v-model="localLoginValue"
        placeholder="Значение"
        variant="outlined"
        density="compact"
        hide-details
        :error="hasFieldError('login')"
        :error-messages="getFieldError('login')"
        @blur="handleLoginBlur"
      />
    </div>

    <div class="table-cell password-cell">
      <v-text-field
        v-if="!isPasswordHidden"
        v-model="localPasswordValue"
        :type="showPassword ? 'text' : 'password'"
        placeholder="Значение"
        variant="outlined"
        density="compact"
        hide-details
        :error="hasFieldError('password')"
        :error-messages="getFieldError('password')"
        @blur="handlePasswordBlur"
      >
        <template #append-inner>
          <v-btn
            :icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
            variant="text"
            size="small"
            class="password-toggle"
            @click="togglePasswordVisibility"
          />
        </template>
      </v-text-field>
    </div>
    <v-btn
      icon="mdi-delete"
      variant="text"
      size="small"
      class="delete-button"
      @click="removeAccount"
    />
  </div>
</template>

<script setup lang="ts">
import type { AccountRowProps, ValidationErrors } from '~/types'

import { useAccountStore } from '~/stores'

const props = defineProps<AccountRowProps>()

const accountStore = useAccountStore()

const accountTypes = ['Локальная', 'LDAP']
const showPassword = ref(false)

const validationErrors = ref<ValidationErrors>({})

const localTagsValue = ref<string>('')
const localLoginValue = ref<string>('')
const localPasswordValue = ref<string>('')
const localTypeValue = ref<string>('')

const initializeLocalValues = (): void => {
  const tags = props.account.tags ?? []
  localTagsValue.value = Array.isArray(tags)
    ? tags.map((tag) => (typeof tag === 'string' ? tag : tag.text)).join('; ')
    : ''

  localLoginValue.value = props.account.login ?? ''
  localPasswordValue.value = props.account.password ?? ''
  localTypeValue.value = props.account.type ?? 'Локальная'
}

const isPasswordHidden = computed(() => localTypeValue.value === 'LDAP')

onMounted(() => {
  nextTick(() => {
    initializeLocalValues()
  })
})

const validateField = (field: 'tags' | 'login' | 'password', value: string): string | undefined => {
  if (field === 'tags') {
    const tags = value
      .split(';')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0)
    if (tags.length > 0) {
      const totalLength = tags.join('').length
      if (totalLength > 100) {
        return 'Общая длина тегов не должна превышать 100 символов'
      }
      for (const tag of tags) {
        if (tag.length > 50) {
          return 'Длина одного тега не должна превышать 50 символов'
        }
      }
    }
  }

  if (field === 'login') {
    if (!value || value.trim() === '') {
      return 'Поле обязательно для заполнения'
    }
    if (value.length > 100) {
      return 'Максимальное количество символов: 100'
    }
  }

  if (field === 'password') {
    if (localTypeValue.value !== 'LDAP') {
      if (!value || value.trim() === '') {
        return 'Поле обязательно для заполнения'
      }
      if (value.length > 100) {
        return 'Максимальное количество символов: 100'
      }
    }
  }

  return undefined
}

const handleTagsBlur = (): void => {
  const error = validateField('tags', localTagsValue.value)
  if (!error) {
    const tags = localTagsValue.value
      .split(';')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0)
      .map((tag) => ({ text: tag }))
    accountStore.updateAccount(props.account.id, { tags })
    const { tags: removed, ...rest } = validationErrors.value
    validationErrors.value = rest
  } else {
    validationErrors.value = { ...validationErrors.value, tags: error }
  }
}

const handleLoginBlur = (): void => {
  const error = validateField('login', localLoginValue.value)
  if (!error) {
    accountStore.updateAccount(props.account.id, { login: localLoginValue.value })
    const { login: removed, ...rest } = validationErrors.value
    validationErrors.value = rest
  } else {
    validationErrors.value = { ...validationErrors.value, login: error }
  }
}

const handlePasswordBlur = (): void => {
  const error = validateField('password', localPasswordValue.value)
  if (!error) {
    accountStore.updateAccount(props.account.id, { password: localPasswordValue.value })
    const { password: removed, ...rest } = validationErrors.value
    validationErrors.value = rest
  } else {
    validationErrors.value = { ...validationErrors.value, password: error }
  }
}

const handleTypeChange = (value: string): void => {
  localTypeValue.value = value
  accountStore.updateAccount(props.account.id, { type: value })

  if (value === 'LDAP') {
    accountStore.updateAccount(props.account.id, { password: null })
    localPasswordValue.value = ''
  }
}

const removeAccount = (): void => {
  accountStore.removeAccount(props.account.id)
}

const togglePasswordVisibility = (): void => {
  showPassword.value = !showPassword.value
}

const getFieldError = (field: keyof ValidationErrors): string | undefined => {
  return validationErrors.value[field]
}

const hasFieldError = (field: keyof ValidationErrors): boolean => {
  return !!getFieldError(field)
}
</script>

<style scoped>
.table-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 32px;
  border-bottom: 1px solid #e0e0e0;
}

.table-row:last-child {
  border-bottom: none;
}

.table-cell {
  padding: 8px;
  border-right: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
}

.table-cell:last-child {
  border-right: none;
}

.password-cell {
  position: relative;
}

.password-toggle,
.delete-button {
  min-width: 32px;
  height: 32px;
}

.password-toggle {
  color: #666;
}

.delete-button {
  color: #f44336;
  margin: auto;
}
</style>
