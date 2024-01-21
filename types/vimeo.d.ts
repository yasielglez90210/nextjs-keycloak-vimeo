export interface APIVimeo {
  total: number
  page: number
  per_page: number
  paging: Paging
  data: Video[]
}

export interface Paging {
  next: number | null
  previous: number | null
  first: string
  last: string
}

export interface Video {
  uri: string
  name: string
  description: string | null
  link: string
  player_embed_url: string
  embed: Embed
  created_time: string
  pictures: Pictures
  resource_key: string
}

export interface Embed {
  html: string
}

export interface Pictures {
  uri: string
  base_link: string
  resource_key: string
}
