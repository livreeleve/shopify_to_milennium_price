import { env } from "@/env"
import axios from "axios"

export const milenniumAPI = axios.create({
  baseURL: env.MILENNIUM_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Basic ${Buffer.from(`${env.MILENNIUM_USER_NAME}:${env.MILENNIUM_PASSWORD}`).toString('base64')}`
  },
  params: {$format: "json"}
})