import { Timestamp } from '@angular/fire/firestore';

export interface Statement {
  approved: boolean;
  timestamp: Timestamp;
  userid: string;
  waterAmount: string;
}
