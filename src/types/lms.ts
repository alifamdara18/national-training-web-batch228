export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface Order {
  id: string;
  userId: string;
  amount: number;
  status: 'PENDING' | 'SUCCESS' | 'FAILED';
  productName: string;
  createdAt: string;
}

export interface ZoomTicket {
  id: string;
  orderId: string;
  userId: string;
  meetingId: string;
  passcode: string;
  schedule: string;
}
