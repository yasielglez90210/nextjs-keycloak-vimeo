'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn, generatePagination } from '@/lib/utils'
import { usePathname, useSearchParams } from 'next/navigation'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { useTranslations } from 'next-intl'

export default function MyPagination({
  totalPages,
  className,
}: {
  totalPages: number
  className?: string
}) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1
  const allPages = generatePagination(currentPage, totalPages)
  const t = useTranslations('Pagination')

  const createPageURL = (page: string | number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', String(page))
    return `${pathname}?${params.toString()}`
  }

  return (
    <>
      <div className={cn('inline-flex', className)}>
        <Pagination>
          <PaginationContent>
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious href={createPageURL(currentPage - 1)}>
                  <ChevronLeft className="h-4 w-4" />
                  <span className="hidden sm:block">{t('Previous')}</span>
                </PaginationPrevious>
              </PaginationItem>
            )}
            {allPages.map((page, index) => {
              if (page === '...') {
                return (
                  <PaginationItem key={index}>
                    <PaginationEllipsis />
                  </PaginationItem>
                )
              }
              return (
                <PaginationItem key={index}>
                  <PaginationLink
                    href={createPageURL(page)}
                    isActive={page === currentPage}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              )
            })}
            {currentPage < totalPages && (
              <PaginationItem>
                <PaginationNext href={createPageURL(currentPage + 1)}>
                  <span className="hidden sm:block">{t('Next')}</span>
                  <ChevronRight className="h-4 w-4" />
                </PaginationNext>
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>
    </>
  )
}
