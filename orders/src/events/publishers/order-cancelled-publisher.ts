import {
  Publisher,
  OrderCancelledEvent,
  Subjects,
} from "@myticketsorganisation/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCanceled;
}
