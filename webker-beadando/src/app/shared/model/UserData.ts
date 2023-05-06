import { Timestamp } from '@angular/fire/firestore';

export interface UserData {
  birthDate: string;
  lastLogin: Timestamp;
  userId: string;
}
