import { OrderStatus } from "../models/order";
import mongoose from "mongoose";
/* import { updateIfCurrentPlugin } from "mongoose-update-if-current"; */
import { Order } from "./order";

interface TicketAttrs {
  id?: string;
  title: string;
  price: number;
}

export interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
  version: number;
  isReserved(): Promise<boolean>;
}

interface TicketModel extends mongoose.Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc;
  findByEvent(event: {
    id: string;
    version: number;
    title: string;
    price: number;
    userId: string;
  }): Promise<TicketDoc | null>;
}

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

ticketSchema.set("versionKey", "version");
/* ticketSchema.plugin(updateIfCurrentPlugin); */
// we can use this middleware instead of update if current plugin
ticketSchema.pre("save", function (done) {
  this.$where = {
    version: this.get("version") - 1,
  };
  done();
});

// With the statics object we add a new method to the Model
ticketSchema.statics.findByEvent = (event: {
  id: string;
  version: number;
  title: string;
  price: number;
  userId: string;
}) => {
  return Ticket.findOne({ _id: event.id, version: event.version - 1 });
};
ticketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Ticket({
    _id: attrs.id,
    title: attrs.title,
    price: attrs.price,
  });
};

// With the methods object we add a new method to the document
ticketSchema.methods.isReserved = async function () {
  // if we use arrow function we dont have access to "this" which is refering to the document
  const existingOrder = await Order.findOne({
    ticket: this,
    status: {
      $in: [
        OrderStatus.Created,
        OrderStatus.AwaitingPayment,
        OrderStatus.Complete,
      ],
    },
  });
  return !!existingOrder;
};

const Ticket = mongoose.model<TicketDoc, TicketModel>("Ticket", ticketSchema);

export { Ticket };
