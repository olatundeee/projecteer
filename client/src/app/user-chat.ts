export interface UserChat {
    recipient: string;
    recipientId: string;
    message: string;
    sender: string;
    senderId: string;
    unique_chat_id_1: {
        senderId: string;
        recipientId: string;
    };
}
