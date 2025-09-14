<template>
  <div class="account-form">
    <div class="form-header">
      <h1 class="form-title">Учетные записи</h1>
      <v-btn
        icon="mdi-plus"
        variant="outlined"
        size="small"
        class="add-button"
        @click="accountStore.addAccount"
      />
    </div>

    <v-alert type="info" variant="tonal" class="hint-alert" prepend-icon="mdi-help-circle">
      Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;
    </v-alert>

    <div class="accounts-table">
      <div class="table-header">
        <div class="header-cell">Метки</div>
        <div class="header-cell">Тип записи</div>
        <div class="header-cell">Логин</div>
        <div class="header-cell">Пароль</div>
      </div>
      <ClientOnly>
        <AccountRow v-for="account in accountStore.accounts" :key="account.id" :account="account" />
      </ClientOnly>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAccountStore } from '~/stores'

const accountStore = useAccountStore()
</script>

<style scoped>
.account-form {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.form-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  gap: 15px;
}

.form-title {
  font-size: 24px;
  font-weight: 500;
  margin: 0;
}

.add-button {
  border: 1px solid #e0e0e0;
}

.hint-alert {
  margin-bottom: 20px;
  background-color: #e3f2fd;
  border: 1px solid #bbdefb;
}

.accounts-table {
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
}

.table-header {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 32px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #e0e0e0;
}

.header-cell {
  padding: 12px 16px;
  font-weight: 500;
  border-right: 1px solid #e0e0e0;
}

.header-cell:last-child {
  border-right: none;
}
</style>
