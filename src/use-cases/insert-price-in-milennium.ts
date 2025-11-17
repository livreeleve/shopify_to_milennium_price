import { PrismaServices } from '@/services/prisma-services'
import { convertPreco } from '@/utils/convert-sku'
import { formatData } from '@/utils/format-data'

interface InsertPriceInMilenniumUseCaseRequest {
  type: 'price' | 'compareAtPrice'
  tabela: number
}

export class InsertPriceInMilenniumUseCase {
  constructor(private prismaService: PrismaServices) {}

  async execute({ type, tabela }: InsertPriceInMilenniumUseCaseRequest) {
    const productsData =
      await this.prismaService.findProductsWithValidVariants()

    const products = productsData?.products

    const insertToMilenniumPrice = products?.map((product) => ({
      tabela,
      produto: product.variants?.[0].sku.split('_')[0].trim(),
      precos: product.variants.map((variant) => convertPreco(variant, type)),
      validade_inicial: formatData(),
      validade_final: '3300-11-17',
    }))

    console.log(JSON.stringify(insertToMilenniumPrice, null, 2), type)
  }
}
