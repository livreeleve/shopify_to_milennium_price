import { MilenniumServices } from '@/services/milennium-services'
import { PrismaServices } from '@/services/prisma-services'
import { convertPreco } from '@/utils/convert-sku'
import { delay } from '@/utils/delay'
import { formatData } from '@/utils/format-data'

interface InsertPriceInMilenniumUseCaseRequest {
  type: 'price' | 'compareAtPrice'
  tabela: number
}

export class InsertPriceInMilenniumUseCase {
  constructor(
    private prismaService: PrismaServices,
    private milenniumService: MilenniumServices,
  ) {}

  async execute({ type, tabela }: InsertPriceInMilenniumUseCaseRequest) {
    const productsData =
      await this.prismaService.findProductsWithValidVariants()

    const products = productsData?.products

    if (!products || products.length === 0) {
      return
    }

    const insertToMilenniumPrice = products.map((product) => ({
      tabela,
      produto: product.variants[0].sku.split('_')[0].trim(),
      precos: product.variants.map((variant) => convertPreco(variant, type)),
      validade_inicial: formatData(),
      validade_final: '3300-11-17',
      legacyId: product.legacyResourceId,
    }))

    // insertToMilenniumPrice.length

    for (let i = 0; i < 3; i++) {
      const { legacyId, ...payload } = insertToMilenniumPrice[i]

      if (i > 0) {
        await delay(0.5 * 60 + 1000)
      }

      await this.milenniumService.insertPriceInMilennium(payload)

      await this.prismaService.updateProduct(legacyId, true)

      console.log(i, 'produto', payload.produto)
    }
  }
}
