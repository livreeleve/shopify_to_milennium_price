interface VariantType {
  id: string
  createdAt: Date
  updatedAt: Date
  title: string
  legacyResourceId: string
  displayName: string
  price: number
  compareAtPrice: number
  barcode: string | null
  sku: string
  productId: string
}

export function convertPreco(
  variant: VariantType,
  type: 'price' | 'compareAtPrice',
) {
  const parts = variant.sku.split('_').map((p) => p.trim())

  const cor = parts[1] ?? ''
  const estampa = parts[2] ?? ''
  const tamanho = parts[3] ?? ''

  return {
    estampa,
    cor,
    tamanho,
    preco: type === 'price' ? variant.price : variant.compareAtPrice,
  }
}
