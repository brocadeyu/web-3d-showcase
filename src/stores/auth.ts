/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  actions: {
    // setAccessCodes(codes: string[]) {
    //   this.accessCodes = codes;
    // },
    // setAccessMenus(menus: MenuRecordRaw[]) {
    //   this.accessMenus = menus;
    // },
    // setAccessRoutes(routes: RouteRecordRaw[]) {
    //   this.accessRoutes = routes;
    // },
    setAccessToken(token: any) {
      this.accessToken = token
    },
    // setIsAccessChecked(isAccessChecked: boolean) {
    //   this.isAccessChecked = isAccessChecked;
    // },
    // setLoginExpired(loginExpired: boolean) {
    //   this.loginExpired = loginExpired;
    // },
    setRefreshToken(token: any) {
      this.refreshToken = token
    },
  },
  persist: {
    // 持久化
    pick: ['accessToken', 'refreshToken', 'accessCodes'],
  },
  state: () => ({
    accessCodes: [],
    accessMenus: [],
    accessRoutes: [],
    accessToken: null,
    isAccessChecked: false,
    loginExpired: false,
    refreshToken: null,
  }),
})
