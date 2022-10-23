import EventEmitter from './event-emitter';

describe('EventEmitter', () => {
  const mock = {
    fn1: jest.fn(),
    fn2: jest.fn(),
    fn3: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should be able to init', () => {
    expect(new EventEmitter()).toBeDefined();
  });

  test('should be able to pub/sub', () => {
    const spy1 = jest.spyOn(mock, 'fn1');
    const spy2 = jest.spyOn(mock, 'fn2');
    const spy3 = jest.spyOn(mock, 'fn3');

    const hub = new EventEmitter();

    hub.subscribe('topic1', mock.fn1);
    hub.subscribe('topic1', mock.fn2);
    hub.subscribe('topic1', mock.fn3);
    hub.publish('topic1', 'context');

    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledTimes(1);
    expect(spy3).toHaveBeenCalledTimes(1);

    hub.unsubscribe('topic1', mock.fn1);
    hub.unsubscribe('topic1', mock.fn2);
    hub.publish('topic1', 'context');
    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledTimes(1);
    expect(spy3).toHaveBeenCalledTimes(2);
  });

  test('should not add multiple instance of same subscription', () => {
    const spy1 = jest.spyOn(mock, 'fn1');

    const hub = new EventEmitter();
    hub.subscribe('topic1', mock.fn1);
    hub.subscribe('topic1', mock.fn1);
    expect(hub.getSubscriptionsByTopic('topic1').length).toBe(1);

    hub.publish('topic1', 'context');
    expect(spy1).toHaveBeenCalledTimes(1);
  });

  test('should be able to handle unsub non-existent topic', () => {
    const hub = new EventEmitter();
    expect(() => hub.unsubscribe('topic1', mock.fn1)).not.toThrow();
  });

  test('should be able get topic count', () => {
    const hub = new EventEmitter();
    hub.subscribe('topic1', mock.fn1);
    hub.subscribe('topic2', mock.fn2);
    expect(hub.topicCount).toBe(2);
  });

  test('should be able to clear the event emitter', () => {
    const hub = new EventEmitter();
    hub.subscribe('topic1', mock.fn1);
    expect(hub.topicCount).toBe(1);

    hub.clear();
    expect(hub.topicCount).toBe(0);
  });

  test('should be able to pub and sub the same context value', () => {
    const hub = new EventEmitter();

    hub.subscribe('topic1', (data) => {
      expect(data).toEqual({ todo: [123] });
    });

    hub.publish('topic1', { todo: [123] });
  });
});
