import { BehaviorSubject } from "rxjs";
const subscriber = new BehaviorSubject(false);
const subscriberTest = new BehaviorSubject("");
const messageService = {
  send: function(msg) {
    subscriber.next(msg);
  }
};
export { messageService, subscriber, subscriberTest };
