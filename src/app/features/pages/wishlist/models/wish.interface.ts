export interface Wish {
    status: string
    count: number
    data: data[]
  }
  
  export interface data {
    _id: string

    sold: number
    images: string[]
    subcategory: Subcategory[]
    ratingsQuantity: number
    title: string
    slug: string
    description: string
    quantity: number
    price: number
    imageCover: string
    category: Category
    brand: Brand
    ratingsAverage: number
    createdAt: string
    updatedAt: string
    id: string
    priceAfterDiscount?: number
    availableColors?: any[]
  }
  
  export interface Subcategory {
    _id: string
    name: string
    slug: string
    category: string
  }
  
  export interface Category {
    _id: string
    name: string
    slug: string
    image: string
  }
  
  export interface Brand {
    _id: string
    name: string
    slug: string
    image: string
  }
  