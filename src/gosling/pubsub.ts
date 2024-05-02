import type { _EventMap } from './schema/gosling.schema';
type EventName = keyof _EventMap;

export function publish<Name extends EventName>(name: Name, data: _EventMap[Name]): void {
    // console.warn('publishing')
    // PubSub.publish(name, data);
}