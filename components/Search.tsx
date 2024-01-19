'use client'

import { SearchIcon } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useSearchParams } from 'next/navigation'
import { useRouter } from '@/navigation'
import { useDebouncedCallback } from 'use-debounce'

export default function Search() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const query = formData.get('query')
    if (!query) return
    const params = new URLSearchParams()
    if (query) {
      params.set('query', query.toString())
      params.set('page', '1')
    }
    router.push(`/?${params.toString()}`)
  }

  const handleChangeInput = useDebouncedCallback((query: string) => {
    if (!query) {
      router.push('/')
    }
  }, 300)

  return (
    <div className="flex w-full max-w-[250px] md:max-w-md items-center">
      <form className="w-full flex" onSubmit={handleSubmit}>
        <Input
          name="query"
          type="text"
          placeholder="Buscar"
          className="rounded-l-[50px] rounded-r-none dark:border-r-zinc-700 focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-gray-400"
          defaultValue={searchParams.get('query')?.toString()}
          onChange={(event) => handleChangeInput(event.target.value)}
        />
        <Button
          type="submit"
          className="rounded-l-none rounded-r-[50px] px-5 bg-gray-100 hover:bg-gray-200 text-zinc-800 border border-zinc-200 border-l-0 dark:bg-zinc-800 dark:border-zinc-700 dark:text-gray-200 dark:border-l-0"
        >
          <SearchIcon size={19} />
        </Button>
      </form>
    </div>
  )
}
