// page遷移ごとに必ず実行する処理(query変更でも呼ばれる)
export default defineNuxtRouteMiddleware((to, from) => {
  console.log('middlewareCommon.global', to, from)
})
