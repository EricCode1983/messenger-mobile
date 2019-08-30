export interface Convseration {
    conversationId: number;
    loginUserCode: string;
    friendUserCode: string;
    groupId: string;
    conversationName: string;
    createDateTime: string;
}
export interface MessageBank {
    msgTimeStamp: string;
    msgFrom: string;
    msgTO: string;
    msgTime: string;
    groupChatId: string;
    msgContent: string;
    msgStatus: string;
    msgReceiveTime: Date;
    msgReadTime: string;
    msgSubmitTime: string;
    msgDeliverTime: Date;
    conversationId: number;
}
export interface AddressBook {
    addressBookContactId: string;
    friendUserCode: string;
    friendDisplayName: string;
    contactMethod: string;
    friendBlock: boolean;
    requestStatus: boolean;
}
export interface GroupChat {
    groupChatId: string;
    groupChatOwnerId: string;
    groupChatName: string;
    contactMethod: string;
    weChatPublicMsgId: string;
}
export interface GroupChatMember {
    groupChatId: string;
    memberUserCode: string;
    groupAdmin: string;
    memberBlock: string;
}
export interface User {
    userCode: string;
    DisplayName: string;
    sex: string;
    email: string;
    phone: string;
    weixiId: string;
    creditPackage: string;
    creditBalance: string;
    creditExpiry: string;
    creditTopUpAmount: string;
    creditTopUpCardDetail: string;
    UserStatus: string;
    LastOnlineTime: string;
    LastContactSyncDate: string;
    LastReceiveMsgDateTIme: string;
    CreateDate: string;
    ReferrelUserId: string;
}
export interface Queue {
    QueueType: string;
    QueueNumber: string;
    LastCheckDateTimeStamp: string;
    MsgDateTimeStampP: string;
}
