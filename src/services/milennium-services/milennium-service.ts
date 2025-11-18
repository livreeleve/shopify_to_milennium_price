/* eslint-disable @typescript-eslint/no-explicit-any */
import { milenniumAPI } from '@/lib/axios'
import { MilenniumServices } from '../milennium-services'

export class MilenniumService implements MilenniumServices {
  async insertPriceInMilennium(body: any): Promise<any> {
    try {
      const response = await milenniumAPI.post(
        '/api/millenium/precos/altera',
        body,
      )

      return response
    } catch (err) {
      console.error(err)

      throw err
    }
  }
}
