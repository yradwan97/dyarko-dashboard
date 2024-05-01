export interface Notification {
    _id: string,
    to: string,
    who: {
        _id: string,
        name: string,
        email: string,
        civilian_id: string,
        phone: string,
        point_balance?: number,
        image: string | null
    },
    is_read: boolean,
    type: string,
    title_ar: string,
    title_en: string,
    body_ar: string,
    body_en: string,
    property: NotificationProperty,
    additional_service_id: string,
    video?: string
    disclaimer?: string
}

export interface NotificationProperty {
    _id: string,
    auto_no: string,
    rent_details: {
        user: string,
        start_date: string,
        end_date: string,
        rent_type: string,
        amount: number,
        _id: string
    },
    title: string,
    code: string,
    image: string | null,
    contract: string | null,
    interior_design: string | null
}