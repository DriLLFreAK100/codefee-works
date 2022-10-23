type ArbitaryFunc = (...arg: any[]) => any;

class EventEmitter {
  private events: Record<string, ArbitaryFunc[]> = {};

  public get topicCount(): number {
    return Object.keys(this.events).length;
  }

  public subscribe(topic: string, action: ArbitaryFunc): void {
    if (!this.events[topic]) {
      this.events[topic] = [];
    }

    if (!this.events[topic].find(e => e === action)) {
      this.events[topic].push(action);
    }
  }

  public unsubscribe(topic: string, action: ArbitaryFunc): void {
    this.events[topic] = this.events[topic]?.filter(e => e !== action);
  }

  public publish(topic: string, ...context: any[]): void {
    this.events[topic].forEach(sub => {
      sub(context);
    });
  }

  public getSubscriptionsByTopic(topic: string): ArbitaryFunc[] {
    return this.events[topic];
  }

  public clear(): void {
    this.events = {};
  }
}

export default EventEmitter;