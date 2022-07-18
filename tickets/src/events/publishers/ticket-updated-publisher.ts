import {
  Publisher,
  TicketUpdatedEvent,
  Subjects,
} from "@myticketsorganisation/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
