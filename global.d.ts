type EN = typeof import('./messages/en.json')
type ES = typeof import('./messages/es.json')

declare interface IntlMessages extends EN, ES {}
