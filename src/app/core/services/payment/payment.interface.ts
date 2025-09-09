export interface PaymentRequest {
    paymentMethod: string;
    cardNumber: string;
    amount: number;
}

export interface PaymentResponse {
    message: string;
    booking: {
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
    };
    payment: {
        transactionId: string;
        amount: number;
        method: string;
        status: string;
        cardLast4: string;
    };
}
