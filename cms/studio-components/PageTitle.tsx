import {BlockStyleProps} from 'sanity'

export default function PageTitle({children}: BlockStyleProps) {
  return <h1 style={{margin: 0}}>{children}</h1>
}
