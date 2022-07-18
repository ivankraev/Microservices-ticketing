import {
  Publisher,
  TicketCreatedEvent,
  Subjects,
} from "@myticketsorganisation/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
