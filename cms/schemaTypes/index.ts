import {navigationType} from './documents/navigation'
import {pageType} from './documents/page'
import {navDropdownType} from './objects/navigation/navDropdown'
import {navDropdownItemType} from './objects/navigation/navDropdownItem'
import {navLinkType} from './objects/navigation/navLink'

export const schemaTypes = [
  pageType,
  navigationType,
  navLinkType,
  navDropdownType,
  navDropdownItemType,
]
