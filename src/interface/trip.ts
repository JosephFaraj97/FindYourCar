export interface ITrip {
    _id?: string
    id?: string
    userId: string
    carId: string
    userCoordinates: string
    carCoordinates: string
    createdDate?: Date
}

export interface ICoordinate {
    longitude: number
    latitude: number
}