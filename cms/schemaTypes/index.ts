import {navigationType} from './documents/navigation'
import {pageType} from './documents/page'
import {blockContentType} from './objects/blockContent'
import {headlineWithDateType} from './objects/headlineWithDate'
import {imageGalleryType} from './objects/imageGallery'
import {anchorAnnotation} from './objects/navigation/anchor'
import {columnTextType} from './objects/navigation/columnText'
import {linkAnnotation} from './objects/navigation/link'
import {navDropdownType} from './objects/navigation/navDropdown'
import {navDropdownItemType} from './objects/navigation/navDropdownItem'
import {navLinkType} from './objects/navigation/navLink'
import {videoType} from './objects/video'

export const schemaTypes = [
  anchorAnnotation,
  linkAnnotation,
  pageType,
  blockContentType,
  columnTextType,
  imageGalleryType,
  navigationType,
  navLinkType,
  navDropdownType,
  navDropdownItemType,
  videoType,
  headlineWithDateType,
]
