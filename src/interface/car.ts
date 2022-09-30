export default interface ICar {
    _id?: string
    id?: string
    category: string
    tag: string[]
    image: string[]
    description: string
    name: string
    lastUserId: string
    status: string
    longitude: string
    latitude: string
    createdDate?: Date
}