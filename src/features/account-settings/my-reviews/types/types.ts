export interface OwnerReview {
    _id: string,
    owner: string,
    user: {
        _id: string,
        name: string,
        image: string,
        point_balance?: number
    },
    rate: number,
    comment: string,
    createdAt: string,
    updatedAt?: string,
}