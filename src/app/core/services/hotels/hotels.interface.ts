export interface HotelLocation {
    city: string;
    state: string;
    street: string;
    number: string;
    zipCode: string;
}

export interface Hotel {
    id: string;
    name: string;
    description: string;
    location: HotelLocation;
    pricePerNight: number;
    guestCapacity: number;
    beds: number;
    amenities: string[];
    createdBy: string;
    status?: string;
    createdAt: string;
    updatedAt: string;
    images: string[];
}

export interface HotelsFilterParams {
    page?: number;
    limit?: number;
    city?: string;
    state?: string;
    minPrice?: number;
    maxPrice?: number;
    guestCapacity?: number;
    amenities?: string[];
}

export interface HotelsWithFilterResponse {
    items: Hotel[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface HotelsAllResponse extends Array<Hotel> { }

export interface HotelByIdResponse extends Hotel { }

export interface HotelsErrorResponse {
    message: string;
    error: string;
    statusCode: number;
}