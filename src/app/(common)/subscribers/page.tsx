"use client"
import { dummyJson } from '@/components/dummy-json'
import { Pagination } from '@/components/reuseble/pagination'
import React, { useState } from 'react'

export default function Subscribers() {
  const [isPage, setIsPage] = useState(1)
  return (
    <div>
        <ul className="flex flex-wrap justify-end my-7">
        <li className="font-medium">
          <Pagination
            onPageChange={(v: any) => setIsPage(v)}
            {...dummyJson.meta}
          ></Pagination>
        </li>
      </ul>
    </div>
  )
}
