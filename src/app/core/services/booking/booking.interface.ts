export interface GuestDetails {
    primaryGuest: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        document: string;
    };
    additionalGuests?: Array<{
        firstName: string;
        lastName: string;
        document: string;
    }>;
}

export interface BookingCreateRequest {
    hotelId: string;
    roomId: string;
    checkIn: string;
    checkOut: string;
    guests: number;
    guestDetails: GuestDetails;
    specialRequests?: string;
    promoCode?: string;
}

export interface BookingCreateSuccessResponse {
    id: string;
    hotelId: string;
    roomId: string;
    checkIn: string;
    checkOut: string;
    guests: number;
    guestDetails: GuestDetails;
    specialRequests?: string;
    promoCode?: string;
    status: string;
    totalAmount?: number;
    createdAt: string;
    updatedAt: string;
}

export interface BookingCreateErrorResponse {
    message: string;
    error: string;
    statusCode: number;
}

export interface BookingCancelSuccessResponse {
    message: string;
    bookingId: string;
    status: string;
}

export interface BookingCancelErrorResponse {
    message: string;
    error: string;
    statusCode: number;
}

export interface BookingSummary {
    id: string;
    confirmationCode: string;
    status: string;
    hotel: {
        id: string;
        name: string;
        location: string;
    };
    room: {
        id: string;
        name: string;
        type: string;
    };
    checkIn: string;
    checkOut: string;
    nights: number;
    guests: number;
    pricing: {
        roomPrice: number;
        nights: number;
        subtotal: number;
        taxes: number;
        discount: number;
        total: number;
    };
    cancellationDeadline: string;
    createdAt: string;
}

export interface BookingDetail extends BookingSummary { }
