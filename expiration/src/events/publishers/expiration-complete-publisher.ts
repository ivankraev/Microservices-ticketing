import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from "@myticketsorganisation/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
