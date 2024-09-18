export type BaseButtonIcon = 'location' | 'zoom' | ''

export type BaseButtonColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark'
  | 'transparent'

export type BaseButtonShape =
  | 'button'
  | 'text'

export interface BaseButtonProps {
  value?: string
  text: string
  link?: string
  icon?: BaseButtonIcon
  buttonShape?: BaseButtonShape
  buttonColor?: BaseButtonColor
  contentFit?: boolean
  overlaid?: boolean
  toggle?: boolean
  pressed?: boolean
  disabled?: boolean
  outlined?: boolean
  shadow?: boolean
  rounded?: boolean
  processing?: boolean
}

export interface ErrorPageContentProps {
  statusCode: number
  apiCode?: string
  message?: string
  messageDetail?: string
}
