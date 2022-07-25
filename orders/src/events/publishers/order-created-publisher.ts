import {
  Publisher,
  OrderCreatedEvent,
  Subjects,
} from "@myticketsorganisation/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
