import {
  Publisher,
  PaymentCreatedEvent,
  Subjects,
} from "@myticketsorganisation/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
